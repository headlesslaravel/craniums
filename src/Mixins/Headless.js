import {capitalize} from "vue";

export default {
    methods: {
        visit(type) {
            this.$inertia.get(this.routes.get(type, this.values))
        },
    },
    computed: {
        sort() {
            return this.$inertia.page.props.headless.sort
        },
        filters() {
            return this.$inertia.page.props.headless.filters
        },
        fields() {
            return this.$inertia.page.props.headless.fields
        },
        values() {
            let key = this.$inertia.page.props.headless.resource_singular

            if(route().current().endsWith('.index')) {
                key = this.$inertia.page.props.headless.resource
            }

            return this.$attrs[key];
        },
        routes() {
            let current = route().current()

            let base = current.substr(0, current.lastIndexOf("."));

            let resource = {
                index: () => route(base + '.index'),
                create: () => route(base + '.create'),
                store: () => route(base + '.store'),
                show: (item) => route(base +'.show', item),
                edit: (item) => route(base +'.edit', item),
                update: (item) => route(base +'.update', item),
                destroy: (item) => route(base +'.destroy', item),
                restore: (item) => route(base +'.restore', item),
                forceDelete: (item) => route(base +'.force-delete', item),
            }

            if(route().has(base + '.imports.index')) {
                resource['imports'] = {
                    create: route(base + '.imports.create'),
                    store: route(base + '.imports.store'),
                }
            }

            return {
                ...resource,
                get(key, params) {
                    return resource[key](params)
                }
            }
        },
        terms() {
            return {
                plural: capitalize(this.$inertia.page.props.headless.resource),
                singular: capitalize(this.$inertia.page.props.headless.resource_singular),
            }
        }
    }
};
