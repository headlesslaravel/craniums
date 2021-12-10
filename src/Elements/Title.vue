<template>
    <div
        v-if="title || $slots.title || $slots.aside"
        class="flex justify-between items-center pb-6"
    >
        <h2
            class="flex-1 font-semibold tracking-wider text-xl text-gray-700 leading-tight"
        >
            <slot name="title">
                {{ title }}
            </slot>
        </h2>
        <div class="-my-5">
            <slot name="aside"/>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title'],
};
</script>
