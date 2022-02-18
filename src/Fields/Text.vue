<template>
  <input
      :name="field.key"
      type="text"
      :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
  />
</template>

<script>
export default {
  props: {
    field: Object,
    modelValue: String,
  },
};
</script>
