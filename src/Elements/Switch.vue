<template>
    <button :class="classes" :title="timestamp" @click.stop="submit">
        <slot v-if="active" name="on">
            {{ on }}
        </slot>
        <slot v-else name="off">
            {{ off }}
        </slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button',
        },
        url: {
            type: String,
        },
        modelValue: {
            type: Object,
            default: null,
        },
        on: {
            type: String,
            default: 'on',
        },
        off: {
            type: String,
            default: 'off',
        },
    },

    emits: ['update:modelValue'],

    computed: {
        active() {
            return (
                this.modelValue instanceof Object &&
                this.modelValue.hasOwnProperty('id')
            );
        },
        timestamp() {
            return this.active ? this.modelValue.created_at : null;
        },
        endpoint() {
            return !this.url.startsWith('http')
                ? '/' + this.url.replace(/^\/+/g, '')
                : this.url;
        },
        classes() {
            return !this.$attrs.class
                ? 'inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition ease-in-out duration-150'
                : this.$attrs.class;
        },
    },

    methods: {
        submit() {
            axios
                .request({
                    method: this.active ? 'DELETE' : 'POST',
                    url: this.endpoint,
                })
                .then((response) => {
                    this.$emit('update:modelValue', response.data);
                });
        },
    },
};
</script>
