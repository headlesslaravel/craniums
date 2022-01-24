<template>
    <div>
        <p>{{ display }}</p>
        <select
            :name="name"
            @change="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            class="w-full"
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
        options: Array,
    }
}
</script>
