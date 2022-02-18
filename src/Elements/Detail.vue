<template>
    <div class="border-gray-200 px-4 py-5 sm:p-0" data-test="cranium-detail">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div v-for="field in fields" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <slot :name="`row.${field.key}`" :value="field.value">
                    <slot :name="`key.${field.key}.all`">
                        <dt :data-test="`cranium-detail-key-${field.key}`" class="capitalize text-sm font-medium text-gray-500 py-4">
                            <slot :name="`key.${field.key}`" :value="field.value">
                                {{ field.display }}
                            </slot>
                        </dt>
                    </slot>
                    <slot :name="`value.${field.key}.all`" :value="field.value">
                        <dd :data-test="`cranium-detail-value-${field.key}`" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 py-4">
                            <slot :name="`value.${field.key}`" :field="field" :value="get(field.key)">
                              <component
                                  :is="field.component"
                                  :key="field.key"
                                  :value="get(field.key)"
                              />
                            </slot>
                        </dd>
                    </slot>
                </slot>
            </div>
        </dl>
    </div>
</template>

<script>
import get from 'lodash.get';
import Text from '../Details/Text.vue'
import Timestamp from '../Elements/Timestamp.vue'

export default {
  components: {
    Text,
    Timestamp,
  },
  props: {
    fields: {
      type: Array,
    },
    values: {
      type: Object,
    }
  },
  methods: {
    get(key) {
      return get(this.values, key);
    }
  }
};
</script>
