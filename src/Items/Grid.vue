<template>
    <div>
        <div v-if="data.data && data.data.length">
            <ul :class="wrapperClass + grid">
                <li
                    v-for="(entry, index) in items"
                    :key="entry.id"
                    :class="itemClass + ' ' + cursorWhenClickable"
                    @click="visit(entry)"
                >
                    <slot :columns="columns" :index="index" :value="entry" name="item">
                        id: {{ entry.id }}
                    </slot>
                </li>
            </ul>
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

export default {
    mixins: [Items],
    props: {
        columns: Number,
    },
    computed: {
        grid() {
            return (
                ' grid grid-cols-1 sm:grid-cols-' + this.columns + ' gap-x-4 gap-y-8'
            );
        },
    },
};
</script>
