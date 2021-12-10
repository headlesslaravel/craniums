<template>
    <Link :href="'/'">
        <application-logo class="w-56" />
    </Link>
</template>

<script>
import { defineComponent } from 'vue';
import { Link } from '@inertiajs/inertia-vue3';
import ApplicationLogo from '@/Jetstream/ApplicationLogo.vue';

export default defineComponent({
    components: {
        ApplicationLogo,
        Link,
    },
});
</script>
