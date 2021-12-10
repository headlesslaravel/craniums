<template>
    <div>
        <div class="flex space-x-4 items-center select-none">
            <jet-input
                :class="{ 'bg-gray-50 cursor-not-allowed': isDisabled }"
                :data-test="`jet-picker-${name}`"
                :disabled="isDisabled"
                :value="buttonText"
                class="w-full select-none cursor-pointer caret-transparent"
                type="text"
                @click="isPicking = true"
            />

            <div v-if="picked || (fill && !isCleared)">
                <svg
                    class="h-6 w-6 mr-3 text-gray-500 hover:text-black cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    :data-test="`jet-picker-clear-${name}`"
                    @click="clear"
                >
                    <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                    />
                </svg>
            </div>
        </div>

        <jet-modal :show="isPicking" max-width="lg" @close="isPicking = false">
            <div :data-test="`jet-picker-modal-${name}`">
                <jet-finder :connect="`picker-${name}`"/>

                <jet-list
                    :click="pick"
                    :connect="`picker-${name}`"
                    :item-display="itemDisplay"
                    :items-path="itemsPath"
                    :url="url"
                />
            </div>
        </jet-modal>
    </div>
</template>

<script>
import JetModal from '@/Jetstream/Modal.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue';
import JetFinder from '../Elements/Finder.vue'
import JetList from '../Items/List.vue'

export default {
    components: {
        JetModal,
        JetInput,
        JetSecondaryButton,
        JetList,
        JetFinder,
    },
    props: {
        url: String,
        fill: Object,
        remember: Boolean,
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            default: 'Select',
        },
        modelValue: String,
        itemKey: {
            type: String,
            default: 'id',
        },
        itemDisplay: {
            type: String,
            default: 'id',
        },
        itemsPath: {
            type: String,
            default: 'data',
        },
        chain: {
            type: [String, Number, null],
            default: 'none',
        },
    },
    mounted() {
        if (this.remember && this.modelValue) {
            this.picked = JSON.parse(localStorage.getItem(this.localKey));
        }
        if (this.isChained && this.chain) {
            this.isDisabled = false;
        } else if (this.isChained && !this.fill) {
            this.isDisabled = true;
        }
    },
    data() {
        return {
            picked: null,
            isCleared: false,
            isDisabled: false,
            isPicking: false,
        };
    },
    computed: {
        isChained() {
            return this.$props.chain !== 'none';
        },
        localKey() {
            return `${window.location.pathname}:filter:${this.name}`;
        },
        buttonText() {
            if (this.isCleared) {
                return this.text;
            }

            if (this.picked) {
                return this.picked[this.itemDisplay];
            }

            if (this.fill) {
                return this.fill[this.itemDisplay];
            }

            return this.text;
        },
    },
    methods: {
        pick(item) {
            this.picked = item;
            this.isPicking = false;
            this.isCleared = false;
            this.$emit('picked', item);
            this.$emit('update:modelValue', item[this.itemKey]);
            if (this.remember) {
                let payload = {};
                payload[this.itemKey] = item[this.itemKey];
                payload[this.itemDisplay] = item[this.itemDisplay];
                localStorage.setItem(this.localKey, JSON.stringify(payload));
            }
        },
        clear() {
            this.picked = null;
            this.isCleared = true;
            this.$emit('cleared');
            this.$emit('update:modelValue', null);
        },
    },
    watch: {
        chain(chain) {
            this.clear();
            this.isDisabled = chain === null;
        },
    },
};
</script>
