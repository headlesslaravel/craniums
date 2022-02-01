<template>
    <Card>
        <template #title>
            {{ title }}
        </template>
        <template #value>
            {{ value }}
        </template>
    </Card>
</template>
<script>
import Card from "./Card.vue";
export default {
    components: {Card},
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
