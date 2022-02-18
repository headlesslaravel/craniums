<template>
    <div>
        <p class="py-1">{{ display }}</p>
        <div class="flex space-x-2">
            <Input
                :type="type"
                placeholder="min"
                :value="min"
                v-bind="$attrs"
                @keyup="$emit(`update:min`, $event.target.value)"
            />

            <Input
                :type="type"
                placeholder="max"
                :value="max"
                v-bind="$attrs"
                @keyup="$emit(`update:max`, $event.target.value)"
            />
        </div>
    </div>
</template>

<script>
import Input from "../Inputs/Input";
export default {
    inheritAttrs: false,
    components: {Input},
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
