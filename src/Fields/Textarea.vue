<template>
    <div>
        <textarea
            :class="{ 'resize-none': !resize }"
            :placeholder="placeholder"
            class="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            v-bind="$attrs"
            :rows="rows"
            @input="update"
            v-text="modelValue"
            :name="field.key"
        />
        <slot v-if="modelValue" :length="modelValue.length" name="footer">
            <p v-if="max > 0" class="text-xs py-1 text-gray-400">
                {{ modelValue.length }} / {{ max }}
            </p>
        </slot>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
    props: {
        field: Object,
        resize: Boolean,
        modelValue: {
            type: String,
            default: '',
        },
        rows: {
            type: Number,
            default: 5,
        },
        max: {
            type: Number,
            default: 0,
        },
        placeholder: {
            default: 'Type something',
        },
    },
    methods: {
        update(event) {
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>
