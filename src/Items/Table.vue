<template>
    <div class="overflow-auto" :data-test="test" v-if="loaded">
        <div v-if="items.length > 0">
            <table class="whitespace-nowrap w-full">
                <thead>
                <tr class="text-left font-bold border-b">
                    <th v-for="th in cellsFormatted" class="px-5 py-3">
                        <slot :name="`th.${th.name}`">
                            <span class="capitalize">
                              {{ th.display }}
                            </span>
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
                        v-for="cell in cellsFormatted"
                        class="px-6 py-4"
                        @click="visit(item)"
                        :data-test="`td-${cell.testid}`"
                    >
                        <slot
                            :index="index"
                            :item="item"
                            :name="`td.${cell.name}`"
                            :value="item[cell.name]"
                        >
                            {{ data_get(item, cell.path) }}
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
            <jet-pagination :connect="connect" :links="links" class="p-5 border-t"/>
        </div>
        <div v-else>
            <slot name="empty">
                <jet-empty/>
            </slot>
        </div>
    </div>
</template>

<script>
import Items from '../Mixins/Items';
import { str_capitalize } from '../Helpers/Str';

export default {
    mixins: [Items],
    data() {
        return {
            currentUrl: null,
            cellsFormatted: [],
        };
    },
    beforeMount() {
        this.cellsFormatted = this.cells.map(cell => {
            return this.formatCell(cell);
        });
    },
    methods: {
        formatCell(cell) {
            // supports:
            // 'brand.title:Brand'
            // 'title:Brand'
            // 'brand.title'
            // 'title'

            let path = cell;
            let column = cell;
            let display;

            if(cell.includes(':')) {
                column = cell.split(':')[0]
                display = cell.split(':')[1]
                path = column;
            }

            if (column.includes('.')) {
                column = cell.split('.')[1];
                if(!display) {
                    display = cell.split('.')[0];
                }
            }

            if(!display) {
                display = cell.replace('_', ' ');
            }

            return {
                path: path,
                name: path,
                testid: path,
                display: str_capitalize(display),
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
                return `jet-table-${this.connect}`
            }

            return 'jet-table'
        }
    }
};
</script>
