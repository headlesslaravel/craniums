<template>
    <div v-bind="$attrs">
        <div class="border-b py-4 px-5">
            {{ title }}
        </div>
        <div class="p-10 text-3xl text-center">
            <span>{{ value ?? '---' }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'value']
}
</script>
