<template>
    <div>
        <p>{{ display }}</p>
        <Input
            :name="name"
            @change="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            type="date"
            class="w-full"
        />
    </div>
</template>

<script>
import Input from "../Inputs/Input";
export default {
  inheritAttrs: false,
  components: {
    Input,
  },
    props: {
        display: String,
        name: String,
        modelValue: String,
    }
}
</script>
