export default {
    inject: ['config'],

    props: {
        routePrefix: String,
    },
    methods: {
        getRoute(name, resource, parent) {
            let params = []

            if (parent !== null && parent !== undefined) {
                if (typeof parent === 'object') {
                    params.push(parent.id);
                } else {
                    params.push(parent);
                }
            }

            if (resource !== null && resource !== undefined) {
                if (typeof resource === 'object') {
                    params.push(resource.id);
                } else {
                    params.push(resource);
                }
            }

            let routeName = this.resource + '.' + name;

            if (this.routePrefix) {
                routeName = this.routePrefix + '.' + routeName;
            } else if (this.config.has('route_name_prefix')) {
                routeName = this.config.get('route_name_prefix') + routeName
            }

            return route(routeName, params);
        },
    },
};
