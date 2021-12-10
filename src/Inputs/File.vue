<template>
    <div>
        <div v-if="name">{{ name }}</div>
        <span @click="$refs.input.click()">
      <slot name="button">
        <secondary-button>
          {{ name ? 'Replace' : 'Choose' }}
        </secondary-button>
      </slot>
    </span>
        <input
            ref="input"
            class="hidden"
            type="file"
            @input="$emit('update:modelValue', $event.target.files[0])"
        />
    </div>
</template>

<script>
import SecondaryButton from './SecondaryButton';

export default {
    components: {SecondaryButton},

    props: ['modelValue'],

    emits: ['update:modelValue'],

    data() {
        return {
            name: null,
        };
    },

    mounted() {
        this.name = this.modelValue ? 'file.' + this.modelValue.split('.')[1] : '';

        if (this.modelValue) {
            this.$emit('update:modelValue', null);
        }
    },

    methods: {
        focus() {
            this.$refs.input.focus();
        },
    },
};
</script>
