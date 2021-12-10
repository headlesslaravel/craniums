<template>
    <div v-show="message">
        <p class="text-sm text-red-600 pt-2">
            {{ message }}
        </p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['message'],
});
</script>
