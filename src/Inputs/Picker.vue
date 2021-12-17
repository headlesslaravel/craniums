<template>
    <div data-test="jet-picker">
        <div class="flex space-x-4 items-center select-none">
            <jet-input
                :class="{ 'bg-gray-50 cursor-not-allowed': isDisabled }"
                :data-test="`jet-picker-${name}`"
                :disabled="isDisabled"
                :value="buttonText"
                class="w-full select-none cursor-pointer caret-transparent"
                type="text"
                @click="picking = true"
            />

            <div v-if="picked">
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

        <jet-modal :show="creating" @close="creating = false">
            <slot name="create" :success="() => { this.creating = false }" :cancel="() => { this.creating = false }" />
        </jet-modal>

        <jet-modal :show="picking && !creating" max-width="lg" @close="picking = false">
            <div :data-test="`jet-picker-modal-${name}`">
                <div class="flex items-center">
                    <div class="flex-1">
                        <jet-finder :connect="`picker-${name}`"/>
                    </div>
                    <div v-if="$slots['create']" class="pr-5">
                        <button @click="creating = true">New</button>
                    </div>
                </div>

                <jet-list
                    :click="pick"
                    item-class="hover:bg-gray-50 py-2 px-5 border-t"
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
import axios from 'axios'
import get from 'lodash.get'
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
        fill: [Object, String],
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
        itemPath: {
            type: String,
        },
        chain: {
            type: [String, Number, null],
            default: 'none',
        },
    },
    beforeMount() {
        if (this.isChained && this.chain) {
            this.isDisabled = false;
        } else if (this.isChained && !this.fill) {
            this.isDisabled = true;
        }

        if(!this.modelValue) {
            return;
        }

        if (this.fill && typeof this.fill === 'object' && this.fill.route) {
            let params = {}
            Object.keys(this.fill).forEach(key => {
                if(key !== 'route') {
                    params[key] = this.fill[key]
                }
            })
            this.setPickedFromUrl(route(this.fill.route, params))
        } else if(this.fill && typeof this.fill !== 'object') {
            this.setPickedFromUrl(this.fill)
        } else {
            this.picked = this.fill
        }
    },
    data() {
        return {
            picked: null,
            isCleared: false,
            isDisabled: false,
            picking: false,
            creating: false,
        };
    },
    computed: {
        isChained() {
            return this.$props.chain !== 'none';
        },
        buttonText() {
            if (this.isCleared) {
                return this.text;
            }

            if (this.picked) {
                return this.picked[this.itemDisplay];
            }

            return this.text;
        },
    },
    methods: {
        setPickedFromUrl(url) {
          axios.request({
              url: url,
              method: 'GET',
              headers: {'Wants-Json': true}
          }).then((response => {
              if(this.itemPath) {
                this.picked = get(response.data, this.itemPath)
              } else {
                this.picked = response.data
              }
          }))
        },
        pick(item) {
            this.picked = item;
            this.picking = false;
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
