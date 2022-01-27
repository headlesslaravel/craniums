<template>
    <div>
        <p>{{ display }}</p>
        <select class="w-full">
            <option value="">Title</option>
            <option value="">Body</option>
            <option value="">Created At</option>
            <option value="">Updated At</option>
        </select>
        <select name="" id="" class="w-full">
            <option>Equals</option>
            <option>Greater than</option>
            <option>Less than</option>
            <option>Includes</option>
            <option>Excludes</option>
            <option>Starts with</option>
            <option>Ends with</option>
            <option>Doesn’t start with</option>
            <option>Doesn’t end with</option>
            <option>Exists</option>
            <option>Empty</option>
            <option>Is one of</option> <!-- where in -->
            <option>between</option> <!-- where between -->
        </select>
        <input type="text" class="w-full">
<!--        <Autocomplete-->
<!--            v-model="selected"-->
<!--            route-name="users.index"-->
<!--            items-path="users"-->
<!--            item-display="name"-->
<!--        />-->
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
import Autocomplete from "../Inputs/Autocomplete";
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
