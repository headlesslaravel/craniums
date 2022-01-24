<template>
    <div v-bind="$attrs">
        <div class="border-b py-4 px-5">
            {{ title }}
        </div>
        <div class="p-10">
            <div v-html="value" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        value: {
            default() {
                return '---'
            }
        }
    }
}
</script>
