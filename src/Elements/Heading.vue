<template>
    <div
        v-if="title || $slots.title || $slots.aside"
        class="flex justify-between items-center"
    >
        <h2
            class="flex-1 font-semibold tracking-wider text-xl text-gray-700 leading-tight"
        >
          <slot name="title">
              {{ title }}
          </slot>
        </h2>
        <div class="-my-5">
            <div class="flex justify-between space-x-5 items-center">
                <slot name="aside"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title'],
};
</script>
