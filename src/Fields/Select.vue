<template>
  <select
      :name="field.key"
      @change="$emit('update:modelValue', $event.target.value)"
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
  >
    <option
        :value="value"
        v-for="(value, display) in Object.entries(options)"
        :selected="modelValue === value"
    >
      {{ display }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    field: Object,
    modelValue: String,
    options: Object,
  },
};
</script>
