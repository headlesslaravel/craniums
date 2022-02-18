<template>
    <div :data-test="test" v-if="loaded">
        <div v-if="items.length > 0">
            <div class="overflow-y-auto">
                <table class="w-full">
                    <thead class="border-t">
                        <tr class="text-left font-bold border-b">
                            <th v-for="th in fieldsFormatted" class="px-5 py-3" :class="{'cursor-pointer hover:underline': th.sortable, 'underline': currentSort?.key === th.key }" @click="applySort(th.key)">
                                <slot :name="`th.${th.key}`" :value="th.display" :sort="applySort">
                                    <TableHeading :value="th" :current="currentSort" />
                                </slot>
                            </th>
                            <th v-if="$slots['tr-last']"/>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr
                            v-for="(item, index) in items"
                            :key="item.id"
                            :class="{ 'cursor-pointer hover:bg-gray-50': this.click }"
                        >
                            <td
                                v-for="field in fieldsFormatted"
                                class="px-6 py-4 whitespace-nowrap truncate"
                                @click="visit(item)"
                                style="max-width: 350px"
                                :data-test="`td-${field.key}`"
                            >
                                <slot
                                    :index="index"
                                    :item="item"
                                    :name="`td.${field.key}`"
                                    :value="item[field.key]"
                                >
                                    {{ data_get(item, field.key) }}
                                </slot>
                            </td>
                            <td v-if="$slots['td-last']">
                                <div class="flex justify-center">
                                    <slot :row="item" name="td-last"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :connect="connect" :links="links" class="p-5 border-t"/>
        </div>
        <div v-else>
            <slot name="empty">
                <Empty/>
            </slot>
        </div>
    </div>
</template>

<script>
import Items from '../Mixins/Items.js';
import { str_capitalize } from '../Helpers/Str.js';
import TableHeading from "./TableHeading.vue";

export default {
    mixins: [Items],
    components: {
        TableHeading,
    },
    props: {
        sort: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            currentSort: null,
            currentUrl: null,
            fieldsFormatted: [],
        };
    },
    beforeMount() {
        this.fieldsFormatted = this.fields.map(field => {
            return this.formatField(field);
        });

        this.loadSortFromUrl()
    },
    methods: {
        loadSortFromUrl() {
            let parameters = this.getQueryParameters();

            if(parameters.hasOwnProperty('sort')) {
                this.currentSort = {key: parameters['sort'], direction: 'asc'}
            }

            if(parameters.hasOwnProperty('sort-desc')) {
                this.currentSort = {key: parameters['sort-desc'], direction: 'desc'}
            }
        },
        getQueryParameters() {
            let search = window.location.search

            if (this.connect) {
              search = localStorage.getItem(this.connect);
            }

            let parameters = Object.fromEntries(
                new URLSearchParams(search).entries()
            );

            return parameters;
        },
        applySort(key) {
            if(!this.sort.includes(key)) {
              return;
            }
            let parameters = this.getQueryParameters();

            if(parameters.sort && parameters.sort === key) {
                delete parameters['sort'];
                parameters['sort-desc'] = key
              this.currentSort = {key: key, direction: 'desc'}
            } else {
                delete parameters['sort-desc'];
                parameters['sort'] = key
                this.currentSort = {key: key, direction: 'asc'}
            }

            if(this.connect) {
              const searchParams = new URLSearchParams();
              Object.keys(parameters).forEach(key => searchParams.append(key, parameters[key]));
              this.get(this.url + '?' + searchParams.toString())
            } else {
              this.$inertia.get(route(route().current()), parameters, {
                preserveState: true
              })
            }

        },
        formatField(field) {
          if(typeof field === 'object') {
            return field;
          }
            // supports:
            // 'brand.title:Brand'
            // 'title:Brand'
            // 'brand.title'
            // 'title'

            let key = field;
            let column = field;
            let display;

            if(field.includes(':')) {
                column = field.split(':')[0]
                display = field.split(':')[1]
                key = column;
            }

            if (column.includes('.')) {
                column = field.split('.')[1];
                if(!display) {
                    display = field.split('.')[0];
                }
            }

            if(!display) {
                display = field.replace('_', ' ');
            }

            return {
                key: key,
                testid: key,
                display: str_capitalize(display),
                sortable: this.sort && this.sort.includes(key),
            }
        },
        data_get(obj, key) {
            let target = obj;

            if (!key.includes('.')) {
                if (obj.hasOwnProperty(key)) {
                    return obj[key];
                }

                return null;
            }

            key.split('.').forEach((segment) => {
                if (target && target.hasOwnProperty(segment)) {
                    target = target[segment];
                }
            });

            return target;
        },
    },
    computed: {
        test() {
            if(this.connect) {
                return `cranium-table-${this.connect}`
            }

            return 'cranium-table'
        }
    }
};
</script>
