<template>
    <div class="flex" data-test="breadcrumbs">
        <div v-for="(crumb, index) in crumbs"  class="flex items-center mr-1">
            <a
                data-test="crumb"
                :href="href(crumb)"
                @click.prevent="visit(crumb)"
                v-html="crumb.display"
                class="cursor-pointer hover:underline mr-1 truncate"
            />
            <svg v-if="index !== crumbs.length - 1" class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
        </div>
    </div>
</template>

<script>
import {Link} from '@inertiajs/inertia-vue3'
export default {
    props: ['current', 'options'],
    components: {Link},
    methods: {
        visit(crumb) {
          return this.$inertia.get(this.href(crumb))
        },
        href(crumb) {
            if(crumb.route) {
                return route(crumb.route, crumb?.parameters)
            }

            return crumb.href;
        }
    },
    computed:  {
        crumbs() {
            return this.options.filter(crumb => this.current.includes(crumb.key))
        }
    }
}
</script>
