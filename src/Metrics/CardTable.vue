<template>
    <div class="border-b py-4 px-5">
        {{ card.title }}
    </div>
    <div>
        <jet-table :data="card.value" v-bind="card.props" />
    </div>
</template>
<script>
import {JetTable} from "../../index";
export default {
    props: ['card'],
    components: {JetTable}
}
</script>
