<template>
    <form v-if="!inline" :id="`query-${$.uid}`" @submit.prevent="filter">
        <div ref="inputs" class="space-y-3">
            <slot :filter="filters"/>
        </div>
        <div class="flex justify-end border-t border-gray-200 mt-3 pt-3">
            <div class="flex space-x-2">
                <jet-secondary-button @click.stop="clear"> Clear</jet-secondary-button>
                <jet-button type="submit"> Filter</jet-button>
            </div>
        </div>
    </form>
    <div v-else>
        <form class="flex justify-center" @submit.prevent="filter">
            <slot :filter="filters"/>
            <button type="submit">
                <slot name="submit">
                    <jet-button>
                        <svg
                            class="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                            />
                        </svg>
                    </jet-button>
                </slot>
            </button>
        </form>
    </div>
</template>

<script>
import JetInput from '@/Jetstream/Input.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue';

export default {
    components: {
        JetInput,
        JetButton,
        JetSecondaryButton,
    },
    props: {
        name: {
            type: String,
        },
        inline: {
            type: Boolean,
        },
    },
    data() {
        return {
            filters: {},
            baseUrl: null,
            parameters: null,
            filterGroup: true,
        };
    },
    mounted() {
        this.fillValues();
    },
    updated() {
        alert();
        // this.fillValues()
    },
    methods: {
        fillValues() {
            this.baseUrl = window.location.origin + window.location.pathname;

            this.parameters = new URLSearchParams(window.location.search);

            for (const key of this.parameters.keys()) {
                let element = document.querySelector(
                    `#query-${this.$.uid} [name="${key}"]`
                );

                if (element) {
                    element.value = this.parameters.get(key);
                }
            }
        },
        clear() {
            this.$inertia.get(window.location.pathname);
        },
        filter() {
            this.parse(this.$refs.inputs.children);

            this.$inertia.get(window.location.pathname, this.filters);
        },

        parse(collection) {
            Array.from(collection).forEach((element) => {
                if (this.hasValue(element)) {
                    this.filters[element.name] = element.value;
                } else if (element.children.length && this.isParsable(element)) {
                    this.parse(element.children);
                }
            });
        },

        hasValue(element) {
            let tagname = element.tagName.toLowerCase();

            return ['select', 'input', 'button'].includes(tagname);
        },

        isParsable(element) {
            let tagname = element.tagName.toLowerCase();

            return !['svg'].includes(tagname);
        },
    },
};
</script>
