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
            return this.$page.props.dateIntervals
        }
    },
    methods: {
        filter(event) {
            let filters = this.options[event.target.value]

            if(this.$attrs.hasOwnProperty('onUpdate:modelValue')) {
                this.$emit('update:modelValue', {
                    from:filters.from,
                    to:filters.to
                });
            } else {
                this.$inertia.get(route(route().current()), {
                    from: filters.from,
                    to: filters.to,
                })
            }

        }
    }
}
</script>
