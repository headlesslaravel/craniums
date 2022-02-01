<template>
    <div>
        <p>{{ display }}</p>
        <Autocomplete
            v-model="selected"
            route-name="users.index"
            items-path="users"
            item-display="name"
        />
<!--        <Picker-->
<!--            :url="route('users.index')"-->
<!--            items-path="users"-->
<!--            item-display="name"-->
<!--        />-->
    </div>
</template>

<script>
// cannot use picker because it uses finder.
// and the FilterPicker is using finder
// creating circular dependencies
// import Picker from "../Inputs/Picker";
import Autocomplete from "../Inputs/Autocomplete.vue";
export default {
    // components: {Picker},
    components: {Autocomplete},
    props: {
        display: String,
        name: String,
        modelValue: String,
        options: Array,
    },
    data() {
        return {
            selected: null
        }
    },
    watch: {
        selected(value) {
            this.$emit('update:modelValue', value)
        }
    }
}
</script>
