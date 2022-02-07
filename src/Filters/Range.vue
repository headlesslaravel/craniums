<template>
    <div>
        <p class="py-1">{{ display }}</p>
        <div class="flex space-x-2">
            <input
                :type="type"
                class="w-full"
                placeholder="min"
                :value="min"
                @keyup="$emit(`update:min`, $event.target.value)"
            />

            <input
                :type="type"
                class="w-full"
                placeholder="max"
                :value="max"
                @keyup="$emit(`update:max`, $event.target.value)"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        display: String,
        name: String,
        min: String,
        max: String,
        type: {
            type: String,
            default: 'number',
        }
    }
}
</script>
