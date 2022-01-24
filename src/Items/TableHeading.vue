<template>
    <div class="flex space-x-2 items-center justify-between">
        <span class="capitalize text-gray-500">
            {{ value.display }}
        </span>
        <span v-if="value.sortable" class="text-gray-400 flex flex-col">
            <svg :class="{'text-black': current?.name === value.name && current?.direction === 'asc'}" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
            <svg :class="{'text-black': current?.name === value.name && current?.direction === 'desc'}" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        value: Object,
        current: Object,
    }
}
</script>
