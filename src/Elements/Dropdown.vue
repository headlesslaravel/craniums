<template>
    <div v-click-outside="close" class="relative z-50" data-test="cranium-dropdown">
        <button ref="trigger" data-test="cranium-dropdown-trigger" @click="toggle" class="cursor-pointer">
            <slot name="trigger"></slot>
        </button>

        <teleport to="body">
            <div v-show="open" class="absolute top-0 left-0 z-50" data-test="cranium-dropdown-content">
                <div
                    ref="content"
                    :style="{ top: top + 'px', left: left + 'px', width: width + 'px' }"
                    class="relative mt-1 rounded-md shadow-lg z-50"
                >
                    <div
                        class="bg-white rounded-md ring-1 ring-black ring-opacity-5 z-50"
                        @click.stop
                    >
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 240,
        },
    },
    data() {
        return {
            open: false,
            top: 0,
            left: 0,
        };
    },
    methods: {
        toggle() {
            let trigger = this.$refs.trigger.getBoundingClientRect();
            this.top = trigger.top + trigger.height;
            this.left = trigger.left - this.width + trigger.width;
            this.open = !this.open;
        },
        close() {
            this.open = false;
        },
    },
};
</script>
