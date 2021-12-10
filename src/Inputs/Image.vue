<template>
    <div>
        <div v-if="!src">
            <secondary-button @click="$refs.input.click()"> Choose</secondary-button>
        </div>
        <div v-else class="w-48 h-48 overflow-hidden rounded-lg relative">
      <span
          class="cursor-pointer p-2 absolute w-full h-full flex justify-end items-end"
          @click="$refs.input.click()"
      >
        <span class="bg-white rounded p-1">
          <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
        </span>
      </span>
            <img :src="src" class="w-full"/>
        </div>
        <input ref="input" class="hidden" type="file" @input="update"/>
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
            src: null,
        };
    },

    mounted() {
        this.src = this.modelValue;

        if (this.modelValue) {
            this.$emit('update:modelValue', null);
        }
    },

    methods: {
        focus() {
            this.$refs.input.focus();
        },
        update(event) {
            this.src = URL.createObjectURL(event.target.files[0]);

            this.$emit('update:modelValue', event.target.files[0]);
        },
    },
};
</script>
