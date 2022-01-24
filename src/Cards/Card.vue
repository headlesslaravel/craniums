<template>
    <div v-bind="$attrs">
        <div class="border-b py-4 px-5">
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <div class="p-10">
            <slot name="value">
                <div v-html="value" />
            </slot>
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
