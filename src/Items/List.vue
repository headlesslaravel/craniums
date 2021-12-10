<template>
    <div>
        <div v-if="items.length">
            <ul :class="wrapperClass">
                <li
                    v-for="(entry, index) in items"
                    :key="entry[itemKey]"
                    :class="itemClass + ' ' + cursorWhenClickable"
                    class="relative"
                    @click="visit(entry)"
                >
                    <slot :index="index" :value="entry" name="item">
                        <div class="py-2 px-6 border-t hover:bg-gray-50">
                            {{ entry[itemDisplay] }}
                        </div>
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
};
</script>
