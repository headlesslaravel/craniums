<template>
    <div>
        <div v-if="items.length">
            <ul :class="wrapperClass" class="py-2">
                <li
                    v-for="(entry, index) in items"
                    :key="entry[itemKey]"
                    :class="itemClass + ' ' + cursorWhenClickable"
                    class="flex space-x-5 items-center"
                    @click="visit(entry)"
                >
                    <input type="checkbox" v-if="selected" :checked="selected && selected.includes(entry.id)" class="focus:ring-gray-9000 h-4 w-4 text-gray-900 border-gray-300 rounded">
                    <slot :index="index" :value="entry" name="item">
                        <span :title="entry[itemDisplay]" class="truncate">{{ entry[itemDisplay] }}</span>
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
