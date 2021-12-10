export default {
    methods: {
        can(permission) {
            if(!this.$page.props.permissions) {
                return true;
            }

            let permissions = this.$page.props.permissions;

            if(!Array.isArray(permissions)) {
                permissions = Object.values(permissions);
            }

            return permissions.includes(permission)
        },
        cannot(permission) {
            return !this.can(permission);
        },
    },
};
