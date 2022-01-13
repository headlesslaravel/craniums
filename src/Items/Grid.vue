<template>
    <div v-if="loaded">
        <div v-if="items.length > 0" class="grid grid-cols-12 gap-4">
            <div
                v-for="(item, index) in items"
                :key="item.id"
                :class="'col-span-' + 12 / columns + ' ' + itemClass"
                @click="visit(item)"
            >
                <slot :index="index" :item="item" name="item">
                    {{ item[itemDisplay] }}
                </slot>
            </div>
            <jet-pagination :connect="connect" :links="links" class="p-5 border-t"/>
        </div>
        <div v-else>
            <slot name="empty">
                <jet-empty/>
            </slot>
        </div>
        <div v-if="false" class="col-span-1 col-span-2 col-span-3 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12"></div>
    </div>
</template>
<script>
import Items from '../Mixins/Items';

export default {
    mixins: [Items],
    props: {
        itemClass: {
            type: String,
            default: (props) => {
                let card = 'border rounded-lg h-48 flex items-center justify-center';

                if(props.click) {
                    return `cursor-pointer ${card}`;
                }

                return card;
            }
        },
        columns: {
            default: 3
        },
    }
};
</script>
