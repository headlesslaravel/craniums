<template>
    <Heading class="bg-yellow-50 p-5" v-if="values.deleted_at">
        <template #title>
            This has been deleted
        </template>
        <template #aside>
            <Link :href="route" method="put">
                Restore
            </Link>
        </template>
    </Heading>
</template>

<script>
import {Link} from "@inertiajs/inertia-vue3";
import { Heading } from "@craniums/vue";

export default {
    props: ['values', 'route'],
    components: {
        Heading,
        Link
    }
}
</script>
