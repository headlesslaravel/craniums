<template>
    <div data-test="picker" class="relative">
        <div class="flex space-x-4 items-center select-none">
            <jet-input
                :class="{ 'bg-gray-50 cursor-not-allowed': isDisabled }"
                :data-test="`picker-${name}`"
                :disabled="isDisabled"
                :value="buttonText"
                class="w-full select-none cursor-pointer caret-transparent"
                type="text"
                @click="picking = true"
            />

            <div v-if="picked" class="absolute h-full border-l flex-1 right-0 flex items-center justify-content text-center px-2 border-l">
                <svg
                    class="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    :data-test="`picker-clear-${name}`"
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
            <slot name="create" :close="() => { this.creating = false }" />
        </jet-modal>

        <jet-modal :show="picking && !creating" max-width="lg" @close="picking = false">
            <div :data-test="`picker-modal-${name}`">
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
                    item-class="cursor-pointer hover:bg-gray-50 py-2 px-5 border-t"
                    @responded="setCreatingWhenEmpty"
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
import Connect from "../Mixins/Connect";
import Empty from "../Items/Empty";

export default {
    mixins: [Connect],
    components: {
        Empty,
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
        modelValue: [String, Number, Object],
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
        parent: {
            type: [String, Number]
        },
    },
    beforeMount() {
        if(this.$attrs.hasOwnProperty('onUpdate:parent')) {
            this.dependent = true;
        }

        this.onConnectChange('formSuccess', (data) => {
            this.$emit('picked', data[this.itemPath])
            this.picked = data[this.itemPath];
            this.creating = false;
            this.picking = false;
        })

        this.setPicked()
    },
    data() {
        return {
            picked: null,
            picking: false,
            creating: false,
            dependent: false,
        };
    },
    computed: {
        isDisabled() {
            return this.dependent && !this.parent
        },
        buttonText() {
            if (this.picked) {
                return this.picked[this.itemDisplay];
            }

            return this.text;
        },
    },
    methods: {
        setPicked() {
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
            this.$emit('picked', item);
            this.$emit('update:modelValue', item[this.itemKey]);
        },
        clear() {
            this.picked = null;
            this.$emit('cleared');
            this.$emit('update:modelValue', null);
        },
        setCreatingWhenEmpty(data)
        {
            if(this.$slots['create'] && data.length === 0) {
                this.creating = true;
                this.picking = false;
            }
        }
    },
    watch: {
        parent() {
            this.clear()
        }
    }
};
</script>
