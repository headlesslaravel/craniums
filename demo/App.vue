<template>
    <Table
        :fields="['id', 'title']"
        :values="[{id: 1, title: 'Hello'}]"
    />
</template>

<script>
import Table from "../src/Items/Table.vue";
export default {
    components: {Table}
}
</script>
