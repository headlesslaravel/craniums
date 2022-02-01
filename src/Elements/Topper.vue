<template>
    <Heading>
        <template #title>
            <span class="capitalize">
                {{ name.replaceAll('-', ' ') }}
            </span>
        </template>
        <template #aside>
            <button
                @click="create"
                class="bg-gray-800 hover:bg-gray-900 text-white rounded-mg px-3 py-1"
                v-if="route().has(name+'.create')">
                Create
            </button>

            <Dropdown>
                <template #trigger>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </template>
                <template #content>
                    <Importer
                        v-if="route().has(name+'.imports.create')"
                        :create="route(name+'.imports.create')"
                        :store="route(name+'.imports.store')"
                    />
                </template>
            </Dropdown>
        </template>
    </Heading>
</template>
<script>
import Heading from './Heading.vue'
import Importer from './Importer.vue'
import Dropdown from "./Dropdown.vue";

export default {
    components: {
        Dropdown,
        Importer,
        Heading,
    },
    props: {
        name: {
            type:String,
            default() {
                return route().current().split('.')[0]
            }
        }
    },
    methods: {
        create() {
            this.$inertia.get(route(this.name+'.create'))
        }
    }
}
</script>
