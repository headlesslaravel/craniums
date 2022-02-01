<template>
    <Dropdown>
        <template #trigger>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
        </template>
        <template #content>
            <div class="p-5">
                <Link :href="routes.edit(values)">
                    Edit
                </Link>
                <button @click="destroy" v-if="!values.deleted_at">
                    Delete
                </button>
            </div>
        </template>
    </Dropdown>
</template>

<script>
import {Link} from "@inertiajs/inertia-vue3";
import Dropdown from "./Dropdown.vue";
export default {
    components: {
        Dropdown,
        Link,
    },
    props: {
        routes: Object,
        values: Object,
    },
    methods: {
        destroy() {
            if (confirm('Are you sure you want to delete this?')) {
                this.$inertia.delete(this.routes.destroy(this.values))
            }
        }
    }
}
</script>
