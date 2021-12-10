<template>
    <select @change="filter">
        <option
            v-for="key in Object.keys(options)"
            v-text="options[key].display"
            :value="key"
        />
    </select>
</template>

<script>
export default {
    computed: {
        options() {
            return this.$page.props.relativeDates
        }
    },
    methods: {
        filter(event) {
            let filters = this.options[event.target.value]

            this.$emit('update:modelValue', filters);
        }
    }
}
</script>
