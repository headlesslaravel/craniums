<template>
    <div>
        <Head :title="title" />

        <jet-flash />

        <div class="relative h-screen flex overflow-hidden ">

            <div class="hidden lg:flex lg:flex-shrink-0" :class="getTheme('sidebar', 'bg-gray-100')">
                <div class="flex flex-col w-64">
                    <div
                        class="border-r flex flex-col flex-grow pb-4 overflow-y-auto"
                    >
                        <div class="flex items-center flex-shrink-0 border-b">
                            <slot name="logo" />
                        </div>
                        <nav
                            id="sidebar-nav"
                            class="mt-5 flex-1 flex flex-col divide-y overflow-y-auto"
                            aria-label="Sidebar"
                        >
                            <slot name="nav"/>
                        </nav>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-auto focus:outline-none">
                <div
                    class="flex-shrink-0 flex h-16 border-b border-gray-200"
                >
                    <button
                        type="button"
                        class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 lg:hidden"
                    >
                        <span class="sr-only">Open sidebar</span>
                        <!-- Heroicon name: outline/menu-alt-1 -->
                        <svg
                            class="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>
                    <!-- Search bar -->
                    <div
                        class="z-50 flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8"
                    >
                        <div class="flex-1 flex">
                            <form
                                class="w-full flex md:ml-0"
                                action="#"
                                method="GET"
                            >
                                <label for="search-field" class="sr-only"
                                >Search</label
                                >
                                <div
                                    class="relative w-full text-gray-400 focus-within:text-gray-600"
                                >
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                                        aria-hidden="true"
                                    >
                                        <!-- Heroicon name: solid/search -->
                                        <svg
                                            class="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <seeker url="admin/api/search" />
                                </div>
                            </form>
                        </div>
                        <div class="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <span class="sr-only">View notifications</span>
                                <!-- Heroicon name: outline/bell -->
                                <svg
                                    class="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>

                            <!-- Profile dropdown -->
                            <div
                                v-click-outside="
                                    () => {
                                        showingNavigationDropdown = false;
                                    }
                                "
                                class="ml-3 relative"
                            >
                                <div>
                                    <button
                                        id="user-menu-button"
                                        type="button"
                                        class="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        @click="
                                            showingNavigationDropdown = !showingNavigationDropdown
                                        "
                                    >
                                        <span
                                            class="bg-gray-100 h-8 w-8 rounded-full"
                                        />
                                        <span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                            <span class="sr-only">Open user menu for </span>
                                            <span class="block">{{ $page.props.user.name }}</span>
                                        </span>
                                        <!-- Heroicon name: solid/chevron-down -->
                                        <svg
                                            class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <!--
                                  Dropdown menu, show/hide based on menu state.-->
                                <div
                                    :class="{
                                        block: showingNavigationDropdown,
                                        hidden: !showingNavigationDropdown,
                                    }"
                                    class="sm:hiddenorigin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabindex="-1"
                                >
                                    <!-- Active: "bg-gray-100", Not Active: "" -->
                                    <div
                                        class="block px-4 py-2 text-xs text-gray-400"
                                    >
                                        Manage Account
                                    </div>

                                    <Link
                                        :href="route('profile.show')"
                                        class="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        tabindex="-1"
                                    >
                                        Profile
                                    </Link>

                                    <div class="border-t border-gray-100"></div>

                                    <!-- Authentication -->
                                    <form @submit.prevent="logout">
                                        <button
                                            class="block px-4 py-2 text-sm text-gray-700"
                                            role="menuitem"
                                        >
                                            Log Out
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main data-test="main" class="flex-1 relative pb-8 z-0 overflow-y-auto " :class="getTheme('main', 'bg-white')">
                    <div>
                        <div class="max-w-7xl mx-auto">

                            <!-- Page Heading -->
                            <header
                                v-if="
                                    $slots['header'] ||
                                    $slots['header.title'] ||
                                    $slots['header.aside']
                                "
                                data-test="header"
                            >
                                <div
                                    class="max-w-7xl mx-auto sm:px-5 lg:px-5 border-b"
                                >
                                    <slot name="header">
                                        <div
                                            class="flex justify-between items-center py-5"
                                        >
                                            <h2
                                                class="flex-1 font-semibold tracking-wider text-xl text-gray-700 leading-tight"
                                            >
                                                <slot name="header.title">
                                                    {{ title }}
                                                </slot>
                                                <span v-if="subtitle" class="pl-1"
                                                >:</span
                                                >
                                                <span
                                                    v-if="subtitle"
                                                    class="ml-3 font-thin text-gray-400"
                                                >
                                                    {{ subtitle }}
                                                </span>
                                            </h2>
                                            <div class="-my-5">
                                                <slot name="header.aside" />
                                            </div>
                                        </div>
                                    </slot>
                                </div>
                            </header>

                            <!-- Page Content -->
                            <main>
                                <div class="max-w-7xl mx-auto ">
                                    <slot />
                                </div>
                            </main>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Head, Link } from '@inertiajs/inertia-vue3';
import JetFlash from '../Elements/Flash';
import get from 'lodash.get'
import Seeker from "../Elements/Seeker";

export default defineComponent({
    inject: ['config'],
    components: {
        Seeker,
        JetFlash,
        Head,
        Link,
    },
    props: {
        title: String,
        subtitle: String,
        theme: Object
    },

    data() {
        return {
            showingNavigationDropdown: false,
        };
    },

    methods: {
        getTheme(key, fallback) {
            // get from this theme object first
            // else get from global
            // TODO: make this method a mixin
            // TODO: make sure the config path is the correct
            return get(this.theme, key, this.config.get(`theme.layout.${key}`, fallback))
        },
        logout() {
            this.$inertia.post(route('logout'));
        },
    },
});
</script>
