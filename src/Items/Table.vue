<template>
    <div :data-test="test" v-if="loaded">
        <div v-if="items.length > 0">
            <div class="overflow-y-auto">
                <table class="w-full">
                    <thead>
                        <tr class="text-left font-bold border-b">
                            <th v-for="th in fieldsFormatted" class="px-5 py-3" :class="{'cursor-pointer hover:underline': th.sortable, 'underline': currentSort?.name === th.name }" @click="applySort(th.name)">
                                <slot :name="`th.${th.name}`" :value="th.display" :sort="applySort">
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
                                class="px-6 py-4 whitespace-nowrap"
                                @click="visit(item)"
                                :data-test="`td-${field.testid}`"
                            >
                                <slot
                                    :index="index"
                                    :item="item"
                                    :name="`td.${field.name}`"
                                    :value="item[field.name]"
                                >
                                    {{ data_get(item, field.path) }}
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
                this.currentSort = {name: parameters['sort'], direction: 'asc'}
            }

            if(parameters.hasOwnProperty('sort-desc')) {
                this.currentSort = {name: parameters['sort-desc'], direction: 'desc'}
            }
        },
        getQueryParameters() {
            let parameters = new URLSearchParams(
                window.location.search
            );

            return Object.fromEntries(parameters.entries())
        },
        applySort(name) {
            let parameters = this.getQueryParameters();

            if(parameters.sort && parameters.sort === name) {
                delete parameters['sort'];
                parameters['sort-desc'] = name
            } else {
                delete parameters['sort-desc'];
                parameters['sort'] = name
            }

            this.$inertia.get(route(route().current()), parameters)
        },
        formatField(field) {
            // supports:
            // 'brand.title:Brand'
            // 'title:Brand'
            // 'brand.title'
            // 'title'

            let path = field;
            let column = field;
            let display;

            if(field.includes(':')) {
                column = field.split(':')[0]
                display = field.split(':')[1]
                path = column;
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
                path: path,
                name: path,
                testid: path,
                display: str_capitalize(display),
                sortable: this.sort && this.sort.includes(path),
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
