<template>
    <div>
        <p>{{ display }}</p>
        <input
            :name="name"
            @keyup="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            type="text"
            class="w-full"
        />
    </div>
</template>

<script>
export default {
    props: {
        display: String,
        name: String,
        modelValue: String,
    }
}
</script>
