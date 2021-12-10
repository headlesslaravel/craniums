<template>
    <div class="relative">
        <button
            ref="button"
            v-click-outside="close"
            :data-open="open"
            class="rounded-full relative inline-flex items-center p-2 border text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
            test="trigger"
            type="button"
            @click="toggle"
        >
      <span
          v-if="count && count > 0"
          class="text-white text-xs text-center absolute top-1 right-1 block w-5 h-5 flex items-center justify-center transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-red-500"
      >
        {{ count }}
      </span>
            <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                />
            </svg>
        </button>
        <div
            v-if="open"
            class="absolute z-50 mt-2 origin-top-right right-0 bg-white shadow-lg rounded overflow-hidden border border-gray-300"
        >
            <div ref="dropdown" class="w-96 shadow">
                <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div
                        class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap"
                    >
                        <slot :all="all" :clear="clear" :unread="unread" name="header">
                            <div class="ml-4 mt-2">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    Notifications
                                </h3>
                            </div>
                            <div
                                class="ml-4 mt-2 space-x-2 text-xs flex-shrink-0 cursor-pointer"
                            >
                <span
                    :class="{ 'text-black font-bold': tab == 'all' }"
                    @click.stop="all"
                >All</span
                >
                                <span
                                    :class="{ 'text-black font-bold': tab == 'unread' }"
                                    @click.stop="unread"
                                >Unread</span
                                >
                            </div>
                        </slot>
                    </div>
                </div>
                <div
                    class="overflow-auto"
                    style="max-height: 500px"
                    test="notifications"
                >
                    <jet-list v-if="loaded" :click="visit" :data="items">
                        <template #empty>
                            <slot name="empty">
                                <p class="py-6 text-center">All caught up</p>
                            </slot>
                        </template>
                        <template #item="{ value: notification }">
                            <div
                                v-if="!notification.read_at"
                                class="bg-blue-400 rounded-full w-2 h-2 absolute top-2 left-2"
                            ></div>
                            <slot :item="notification" name="item">
                                <div
                                    :class="{
                    'bg-gray-50 hover:bg-gray-100': notification.read_at,
                    'bg-white hover:bg-gray-50': !notification.read_at,
                  }"
                                    class="flex items-start p-5 cursor-pointer border-b"
                                >
                                    <div
                                        v-if="$slots['icon']"
                                        class="flex-shrink-0 rounded-full p-3 bg-white border text-gray-400"
                                    >
                                        <slot :type="notification.type" name="icon"></slot>
                                    </div>
                                    <div class="ml-3 w-0 flex-1 pt-0.5">
                                        <slot :item="notification" name="content"></slot>
                                    </div>
                                    <slot
                                        :close="
                      () => {
                        remove(notification);
                      }
                    "
                                        name="close"
                                    >
                                        <div class="ml-4 flex-shrink-0 flex">
                                            <button
                                                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                @click.stop="remove(notification)"
                                            >
                                                <span class="sr-only">Close</span>
                                                <svg
                                                    aria-hidden="true"
                                                    class="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        clip-rule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        fill-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </slot>
                                </div>
                            </slot>
                        </template>
                    </jet-list>
                </div>
                <slot name="footer">
                    <div
                        v-if="items.data && items.data.length > 0"
                        class="flex justify-end text-xs bg-white px-4 py-5 border-t border-gray-200 sm:px-6"
                    >
                        <button
                            class="relative inline-flex items-center"
                            type="button"
                            @click.stop="clear"
                        >
                            Clear All
                        </button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import {JetList} from '../../index';
import JetDropdown from '@/Jetstream/Dropdown.vue';

export default {
    components: {
        JetList,
        JetDropdown,
    },
    mounted() {
        this.count = localStorage.notificationCount;

        if (!this.count) {
            axios.get('/notifications/count').then((response) => {
                this.count = response.data.unread;
                localStorage.setItem('notificationCount', response.data.unread);
            });
        }
    },
    data() {
        return {
            tab: 'all',
            open: false,
            count: null,
            loaded: false,
            items: [],
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;

            if (this.open) {
                this.all();
            }
        },
        close() {
            this.open = false;
        },
        visit(notification) {
            axios
                .post('/notifications/' + notification.id + '/mark-as-read')
                .then((response) => {
                    this.$inertia.visit(
                        route('proposals.show', notification.data.proposal_id)
                    );
                });
        },
        remove(notification) {
            axios.delete('/notifications/' + notification.id).then((response) => {
                this.items.data = this.items.data.filter((n) => {
                    return notification.id !== n.id;
                });
            });
        },
        clear() {
            this.items = [];

            axios.post('/notifications/clear');
        },
        all() {
            this.tab = 'all';
            this.loaded = false;

            axios.get('/notifications').then((response) => {
                this.count = null;
                this.loaded = true;
                this.items = response.data;
                localStorage.removeItem('notificationCount');
            });
        },
        unread() {
            this.tab = 'unread';

            this.loaded = false;

            axios.get('/notifications/unread').then((response) => {
                this.count = null;
                this.loaded = true;
                this.items = response.data;
                localStorage.removeItem('notificationCount');
            });
        },
    },
};
</script>
