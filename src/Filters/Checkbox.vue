<template>
    <div>
        <label>
            <input
                @change="$emit('update:modelValue', $event.target.checked)"
                :value="modelValue"
                type="checkbox"
                class="mr-2"
                :checked="modelValue === on"
            />
            <span>
                {{ display }}
            </span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        display: String,
        on: String,
        off: String,
        modelValue: String,
    }
}
</script>
