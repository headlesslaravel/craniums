<template>
    <div v-if="mode === 'none'">{{ value }}</div>
    <div v-if="mode === 'limit'">
        <span v-text="value.slice(0, limit)"/>
        <span v-if="open" v-text="value.slice(limit, value.length)"/>
        <span v-if="!open">...</span>
        <span v-if="value.length > limit" class="ml-3">
      <button
          v-if="!open"
          class="font-bold hover:underline"
          @click="open = true"
      >
        More
      </button>
      <button
          v-if="open"
          class="font-bold hover:underline"
          @click="open = false"
      >
        Less
      </button>
    </span>
    </div>
    <div v-if="mode === 'modal'">
        <div class="hover:underline font-bold cursor-pointer" @click="open = true">
            {{ triggerText }}
        </div>
        <modal :show="open" @close="open = false">
            <div class="p-10">
                {{ value }}
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/Jetstream/Modal.vue';

export default {
    components: {
        Modal,
    },
    props: {
        value: String,
        mode: {
            type: String,
            default: 'none',
        },
        triggerText: {
            type: String,
            default: 'View',
        },
        limit: {
            type: Number,
            default: 45,
        },
    },
    data() {
        return {
            open: false,
        };
    },
};
</script>
