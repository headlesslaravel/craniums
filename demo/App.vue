<template>
    <Table
        :fields="['id', 'title']"
        :values="[{id: 1, title: 'Hello'}]"
    />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
<script>
import Table from "../src/Items/Table.vue";
export default {
    components: {Table}
}
</script>
