<template>
        <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
        <div v-show="message && open" data-test="jet-flash">
            <div class="flex bg-green-500 text-white p-5">
                <svg v-if="['store', 'update', 'restore'].includes(type)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-if="['destroy', 'force-delete'].includes(type)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="font-bold ml-3 md:w-1/2 truncate">
                    {{ message }}
                </span>
            </div>
        </div>
        </transition>
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    computed: {
        type() {
            return this.$page.props.jetstream.flash?.type
        },
        message() {
            return this.$page.props.jetstream.flash?.message
        }
    },
    watch: {
        type: {
            immediate: true,
            deep: true,
            handler: function(flash) {
                if(flash) {
                    this.open = true;
                    window.setTimeout(() => {
                        this.open = false
                    }, 2000)
                }
            }
        }
    }
}
</script>
