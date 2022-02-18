<template>
    <div>
        <p>{{ display }}</p>
        <select
            :name="name"
            @change="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            class="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full select-none cursor-pointer caret-transparent"
        >
            <option v-for="key in Object.keys(options)" :value="key">
                {{ options[key] }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        display: String,
        name: String,
        modelValue: String,
        options: Object,
    }
}
</script>
