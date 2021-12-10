<template>
    <div class="text-center">
    <span ref="button">
      <jet-secondary-button
          v-click-outside="close"
          :data-open="open"
          class="uppercase"
          @click="toggle"
      >
        <template v-if="empty">
          {{ plural }}
        </template>
        <template v-else class="cursor-pointer whitespace-nowrap">
          <template v-if="!min && !max">
            {{ single }}
          </template>
          <template v-if="min && !max"> {{ min }} + </template>
          <template v-else-if="max && !min"> up to {{ max }} </template>
          <template v-else-if="min === max">
            {{ min }}
          </template>
          <template v-else-if="min && max"> {{ min }} to {{ max }} </template>
        </template>
      </jet-secondary-button>
    </span>
        <div class="relative">
            <div
                v-show="open"
                ref="dropdown"
                class="p-4 bg-white shadow rounded absolute"
            >
                <div class="flex justify-center items-center space-x-1">
                    <input
                        v-query
                        :class="inputClasses"
                        :name="`${name}:min`"
                        :type="type"
                        placeholder="min"
                        @click.stop
                    />
                    <span>-</span>
                    <input
                        v-query
                        :class="inputClasses"
                        :name="`${name}:max`"
                        :type="type"
                        placeholder="max"
                        @click.stop
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue';
import {Inertia} from '@inertiajs/inertia';

export default {
    props: {
        type: {
            type: String,
        },
        name: {
            type: String,
        },
        single: {
            type: String,
        },
        plural: {
            type: String,
        },
        inputClasses: {
            type: String,
            default:
                'w-40 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2 mb-2 border',
        },
    },

    components: {
        JetSecondaryButton,
    },

    data() {
        return {
            open: false,
            query: {},
        };
    },

    created() {
        this.updateQuery();

        Inertia.on('navigate', (event) => {
            this.updateQuery();
            this.offsetDropdown();
        });
    },

    methods: {
        updateQuery() {
            this.query = new URLSearchParams(window.location.search);
        },

        toggle() {
            this.open = !this.open;

            this.offsetDropdown();
        },

        close() {
            this.open = false;
        },

        offsetDropdown() {
            this.$nextTick(() => {
                let buttonOffset = this.$refs.button.offsetWidth / 2;

                this.$refs.dropdown.style.left =
                    -(this.$refs.dropdown.offsetWidth / 2) + buttonOffset + 'px';
            });
        },
    },
    computed: {
        empty() {
            return (
                !this.query.get(`${this.name}:min`) &&
                !this.query.get(`${this.name}:max`)
            );
        },

        pluralMin() {
            return this.query.get(`${this.name}:min`) === 1
                ? this.single
                : this.plural;
        },

        pluralMax() {
            return this.query.get(`${this.name}:max`) === 1
                ? this.single
                : this.plural;
        },

        min() {
            return this.query.get(`${this.name}:min`);
        },

        max() {
            return this.query.get(`${this.name}:max`);
        },
    },
};
</script>
