<template>
    <div>
        <p>{{ display }}</p>
        <input
            :name="name"
            @change="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            type="date"
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
