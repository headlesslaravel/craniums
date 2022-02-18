<template>
  <input
      :name="name"
      @keyup="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      type="text"
      v-bind="$attrs"
      class="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
  }
}
</script>
