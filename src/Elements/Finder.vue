<template>
    <div>
        <div class="flex space-x-4 p-5">
            <div class="flex-1">
                <div class="relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            class="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                            />
                        </svg>
                    </div>

                    <input
                        id="search"
                        v-query:[connect]="searchHandler"
                        autocomplete="off"
                        class="bg-gray-50 focus:bg-white py-2 focus:ring-gray-200 focus:border-gray-200 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        name="search"
                        data-test="cranium-finder-search"
                        placeholder="Search"
                        type="text"
                    />
                </div>
            </div>

            <FinderSelect
                v-if="sort"
                v-query:[connect]="sortHandler"
                data-test="cranium-finder-sort"
                :options="sortOptions"
                empty="Sort"
                name="sort"
            />

            <FinderSelect
                v-if="trashed"
                v-query:[connect]="trashHandler"
                data-test="cranium-finder-trash"
                :options="trashOptions"
                empty="Trash"
            />

            <DateInterval v-if="dateInterval" />
            <button
                v-if="filters.length"
                :class="{
                  'bg-gray-200 border-black border-2 font-bold': isFiltering,
                  'bg-white': !isFiltering,
                }"
                class=" rounded-md border border-gray-300 cursor-pointer flex space-x-2 items-center px-3 shadow"
                data-test="cranium-finder-filters-trigger"
                @click="filtering = true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" :class="{'text-black': isFiltering}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Filters</span>
      </button>
    </div>
        <teleport to="body">
            <div
                v-if="filters.length && filtering"
                class="fixed inset-0 overflow-hidden z-20"
                role="dialog"
            >
                <div class="absolute inset-0 overflow-hidden">
                    <div
                        class="absolute w-full h-screen transition-opacity bg-black opacity-50 z-20"
                        @click="filtering = false"
                    ></div>
                    <div class="z-20 fixed inset-y-0 right-0 max-w-full flex">
                        <div class="relative w-screen max-w-md">
                            <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                <div class="px-4 sm:px-6 pb-6 border-b">
                                    <h2 class="text-lg font-medium text-gray-900">
                                        Filters
                                    </h2>
                                </div>
                                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                                    <div class="absolute inset-0 px-4 sm:px-6">
                                        <div class="h-full flex justify-between flex-col">
                                            <div data-test="cranium-finder-filters" class="flex-1 overflow-auto space-y-3">
                                                <slot :filters="filterValues" name="filters">
                                                    <div v-for="filter in filtersWithBindings" :data-test="`filter-${filter.key}`">
                                                        <slot :name="`filter-${filter.key}`" :values="filterValues" :filter="filter">
                                                            <component
                                                                :is="filter.component"
                                                                :display="filter.display"
                                                                v-bind="filter.bindings"
                                                                :name="filter.key"
                                                            />
                                                        </slot>
                                                    </div>
                                                </slot>
                                            </div>
                                            <div class="flex space-x-4 pb-8 pt-4 border-t mt-4">
                                                <jet-button
                                                    @click="filterHandler"
                                                    data-test="cranium-finder-filters-submit">
                                                    Filter
                                                </jet-button>
                                                <jet-secondary-button
                                                    @click="clearFilters"
                                                    data-test="cranium-finder-filters-clear">
                                                    Clear
                                                </jet-secondary-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
import debounce from 'lodash.debounce'
import JetInput from '../../Jetstream/Input.vue';
import FinderSelect from './FinderSelect.vue';
import Connect from '../Mixins/Connect.js';
import {Inertia} from '@inertiajs/inertia';
import JetButton from '../../Jetstream/Button.vue';
import JetSecondaryButton from '../../Jetstream/SecondaryButton.vue';
import DateInterval from '../Inputs/DateInterval.vue';
import FilterText from '../Filters/Text.vue';
import FilterDate from '../Filters/Date.vue';
import FilterRange from '../Filters/Range.vue';
import FilterSelect from '../Filters/Select.vue';
import FilterCheckbox from '../Filters/Checkbox.vue';

export default {
    props: {
        sort: Array,
        trashed: Boolean,
        dateInterval: Boolean,
        filters: {
            type: Array,
            default: () => [],
        },
        filtersFill: {
            type: Object,
            default: {},
        },
    },
    mixins: [Connect],
    components: {
        JetInput,
        FinderSelect,
        JetButton,
        JetSecondaryButton,
        DateInterval,
        FilterText,
        FilterDate,
        FilterRange,
        FilterSelect,
        FilterCheckbox,
    },
    beforeMount() {
        Inertia.on('start', () => {
            this.filtering = false;
        });

        this.initFilters();
    },
    data() {
        return {
            searching: null,
            sorting: null,
            filtering: false,
            filterValues: {},
        };
    },
    methods: {
        initFilters() {
            this.filters.forEach((filter) => {
                if(!filter.modifiers) {
                  this.filterValues[filter] = null
                } else if(filter.modifiers.length === 0) {
                  this.filterValues[filter.key] = null;
                } else {
                  filter.modifiers.forEach(modifier => {
                    this.filterValues[`${filter.key}:${modifier}`] = null;
                  })
                }
            })

            if(this.filtersFill) {
                Object.keys(this.filtersFill).forEach(key => {
                    this.filterValues[key] = this.filtersFill[key]
                })
            }

            let search = window.location.search;

            //TODO: refactor this with Tabe.vue implementation
            if (this.connect) {
                search = localStorage.getItem(this.connect);
            }

            let parameters = Object.fromEntries(
                new URLSearchParams(search).entries()
            );

            Object.keys(this.filterValues).forEach((key) => {
                if (parameters.hasOwnProperty(key)) {
                    this.filterValues[key] = parameters[key];
                }
            });
        },
        clearFilters() {

            this.filterValues = {}

            this.applyHandler('filter', 'onFilter', {})
        },
        filterValue(key) {
            return this.filterValues[key];
        },
        searchHandler: debounce(function(payload) {
            this.applyHandler('search', 'onSearch', payload)
        }, 300),
        trashHandler(payload) {
            this.applyHandler('trash', 'onTrash', payload)
        },
        sortHandler(payload) {
            this.applyHandler('sort', 'onSort', payload)
        },
        filterHandler() {
            let filters = JSON.parse(JSON.stringify(this.filterValues));

            Object.keys(filters).forEach(
                (key) => filters[key] == null && delete filters[key]
            );

            this.applyHandler('filter', 'onFilter', filters)
        },
        applyHandler(emit, listener, payload) {
            this.filtering = false;
            if (this.$attrs[listener]) {
                this.$emit(emit, payload)
            } else if (this.connect) {
                this.connectChanged('updateQuery', payload);
            } else {
                this.$inertia.get(window.location.pathname, payload, {
                  preserveState: true
                });
            }
        },
        displayFormat(item) {
            return item
                .replace('_', ' ')
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        },
    },
    computed: {
        filtersWithBindings() {
            // workaround for inertia/issues/775
            let filters = JSON.parse(JSON.stringify(this.filters));

            let urlSearchParams = new URLSearchParams(window.location.search);

            return filters.map(filter => {

                filter.bindings = {
                    ...filter.props
                }

                if(filter.modifiers.length > 0) {

                    filter.modifiers.forEach(modifier => {

                        let queryParameter = `${filter.key}:${modifier}`; // posts:min

                        filter.bindings[modifier] = urlSearchParams.get(queryParameter)

                        this.filterValues[queryParameter] = filter.bindings[modifier]

                        filter.bindings[`onUpdate:${modifier}`] = (value) => {
                            this.filterValues[queryParameter] = value
                        }
                    })
                } else {
                    filter.bindings['onUpdate:modelValue'] = (value) => {
                        this.filterValues[filter.key] = value
                    }
                }

                return filter;
            })
        },
        isFiltering() {
            return (
                Object.keys(this.filterValues).filter((key) => {
                    return this.filterValues[key] !== null
                        && this.filtersFill.hasOwnProperty(key) === false;
                }).length > 0
            );
        },
        trashOptions() {
            return [
                {
                    name: 'trash',
                    value: 'with',
                    display: 'With Trashed',
                },
                {
                    name: 'trash',
                    value: 'only',
                    display: 'Only Trashed',
                },
            ];
        },
        sortOptions() {
            if (!this.sort) {
                return [];
            }

            let options = [];

            this.sort.forEach((item) => {
                if (item instanceof Object) {
                    options.push(item);
                } else {
                    let display = item;

                    if(item.includes(':')) {
                        item = item.split(':')[0]
                        display = display.split(':')[1]
                    }

                    options.push({
                        name: 'sort',
                        value: item,
                        display: this.displayFormat(display) + ' (asc)',
                    });

                    options.push({
                        name: 'sort-desc',
                        value: item,
                        display: this.displayFormat(display) + ' (desc)',
                    });
                }
            });

            return options;
        },
    },
};
</script>
