<template>
    <div class="border-b py-4 px-5">
        {{ card.title }}
    </div>
    <div>
        <Table :values="card.value" v-bind="card.props" />
    </div>
</template>
<script>
import {Table} from "../../index";
export default {
    props: ['card'],
    components: {Table}
}
</script>
