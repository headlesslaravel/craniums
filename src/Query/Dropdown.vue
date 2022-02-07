<template>
    <cranium-dropdown :width="60" align="right">
        <template #trigger>
      <span class="inline-flex rounded-md mr-3">
        <button
            :class="{ 'bg-indigo-500 text-white': this.active }"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md hover:text-black focus:outline-none focus:text-black active:text-black transition ease-in-out duration-150"
            data-test="dropdown-trigger"
            type="button"
        >
          <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
        </button>
      </span>
        </template>

        <template #content>
            <div class="w-60 p-3 text-base font-normal normal-case tracking-normal">
                <slot/>
            </div>
        </template>
    </cranium-dropdown>
</template>
<script>
import JetDropdown from '../../Jetstream/Dropdown.vue'

export default {
    components: {
        JetDropdown,
    },
    props: ['name'],
    computed: {
        active() {
            return window.location.search.length > 0
        },
    },
}
</script>
