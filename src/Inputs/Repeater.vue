<template>
    <div v-for="(row, index) in rows" class="flex">
        <div class="w-10">
            <button @click="rows.slice(index, 1)">
                <slot name="remove">Remove</slot>
            </button>
            <button @drag="">
                <slot name="drag">=</slot>
            </button>
            <!-- https://sagalbot.github.io/vue-sortable/ -->
        </div>
        <div class="flex-1">
            <slot name="row" :row="row" />
        </div>
    </div>
    <button @click="add">
        <slot name="add">Add Row</slot>
    </button>
</template>

<script>
export default {
    props: {
        fields: {
            required: true,
            type: Array
        },
        modelValue: {
            type: Array,
            default: []
        }
    },

    methods: {
        add() {
            let row = {}

            this.fields.forEach(field => {
                row[field] = null
            })

            this.rows.push(row)
        }
    }

    // maybe set data.rows and watch and emit event
    // if prop modification is an issue
}
</script>
