<template>
    <div>
        <div class="flex space-x-4 p-5">
            <div class="flex-1">
                <div class="relative rounded-md shadow-sm">
                    <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
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
                        class="focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        name="search"
                        data-test="jet-finder-search"
                        placeholder="Search"
                        type="text"
                    />
                </div>
            </div>

            <jet-select
                v-if="trashed"
                v-query:[connect]="trashHandler"
                data-test="jet-finder-trash"
                :options="trashOptions"
                empty="Not Trashed"
                name="trash"
            />

            <jet-select
                v-if="sort"
                v-query:[connect]="sortHandler"
                data-test="jet-finder-sort"
                :options="sortOptions"
                empty="Sort"
                name="sort"
            />

            <span
                v-if="$slots['filters']"
                :class="{
                  'bg-gray-200 border-black border-2': isFiltering,
                  'bg-white': !isFiltering,
                }"
                class="select rounded-md border border-gray-300 cursor-pointer"
                data-test="jet-finder-filter-trigger"
                @click="filtering = true"
            >
        Filters
      </span>
    </div>
        <teleport to="body">
            <div
                v-if="$slots['filters'] && filtering"
                aria-labelledby="slide-over-title"
                aria-modal="true"
                class="fixed inset-0 overflow-hidden z-50"
                role="dialog"
            >
                <div class="absolute inset-0 overflow-hidden">
                    <div
                        aria-hidden="true"
                        class="absolute w-full h-screen transition-opacity bg-black opacity-50 z-40"
                        @click="filtering = false"
                    ></div>
                    <div class="z-50 fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <div class="relative w-screen max-w-md">
                            <div
                                class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
                            >
                                <div class="px-4 sm:px-6 pb-6 border-b">
                                    <h2
                                        id="slide-over-title"
                                        class="text-lg font-medium text-gray-900"
                                    >
                                        Filters
                                    </h2>
                                </div>
                                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                                    <div class="absolute inset-0 px-4 sm:px-6">
                                        <div
                                            aria-hidden="true"
                                            class="h-full flex justify-between flex-col"
                                        >
                                            <div data-test="jet-finder-filters" class="flex-1 overflow-auto">
                                                <slot :filters="filterValues" name="filters"/>
                                            </div>
                                            <div class="flex space-x-4 pb-8 pt-4 border-t mt-4">
                                                <jet-button
                                                    @click="filterHandler"
                                                    data-test="jet-finder-filters-submit">
                                                    Filter
                                                </jet-button>
                                                <jet-secondary-button
                                                    @click="clearFilters"
                                                    data-test="jet-finder-filters-clear">
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
<style>
.select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
}
</style>
<script>
import debounce from 'lodash.debounce'
import JetInput from '@/Jetstream/Input.vue';
import JetSelect from '../Inputs/Select.vue';
import Connect from '../Mixins/Connect';
import {Inertia} from '@inertiajs/inertia';
import JetButton from '@/Jetstream/Button.vue';
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue';


export default {
    props: {
        sort: Array,
        trashed: Boolean,
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
        JetSelect,
        JetButton,
        JetSecondaryButton,
    },
    beforeMount() {
        Inertia.on('start', () => {
            this.filtering = false;
        });

        this.initFilters();
    },
    data() {
        return {
            filterValues: {},
            filtering: false,
            searching: null,
            sorting: null,
            trashing: null,
            searchTimeout: null
        };
    },
    methods: {
        initFilters() {
            this.filters.forEach((filter) => {
                this.filterValues[filter] = null;
            })

            if(this.filtersFill) {
                Object.keys(this.filtersFill).forEach(key => {
                    this.filterValues[key] = this.filtersFill[key]
                })
            }

            let search = window.location.search;

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
            this.filters.forEach((filter) => {
                this.filterValues[filter] = null;
            });
            this.filterHandler();
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
                    preserveState: true,
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
                    name: 'with-deleted',
                    value: 'true',
                    display: 'With Trashed',
                },
                {
                    name: 'only-deleted',
                    value: 'true',
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