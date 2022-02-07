<template>
    <div data-test="cranium-dropdown" class="z-10">
      <Popper>
        <button data-test="cranium-dropdown-trigger">
            <slot name="trigger"></slot>
        </button>
        <template #content>
          <div class="bg-white rounded shadow-lg p-5" data-test="cranium-dropdown-content">
            <slot name="content"></slot>
          </div>
        </template>
      </Popper>
    </div>
</template>

<script>
import Popper from "vue3-popper";

export default {
    components: {
      Popper,
    },
};
</script>
