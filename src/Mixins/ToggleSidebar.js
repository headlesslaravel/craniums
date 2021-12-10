export default {
    data() {
        return {
            sidebarIsOpen: true,
            sidebarIsClosed: false,
        };
    },
    created() {
        if (localStorage.getItem('sidebar-open')) {
            this.sidebarIsOpen = true;
            this.sidebarIsClosed = false;
        } else if (localStorage.getItem('sidebar-closed')) {
            this.sidebarIsOpen = false;
            this.sidebarIsClosed = true;
        } else {
            this.sidebarIsOpen = true;
            this.sidebarIsClosed = false;
        }
    },
    methods: {
        toggleSidebar() {
            if (this.sidebarIsOpen) {
                this.sidebarIsOpen = false;
                this.sidebarIsClosed = true;
                localStorage.removeItem('sidebar-open');
                localStorage.setItem('sidebar-closed', true);
            } else {
                this.sidebarIsOpen = true;
                this.sidebarIsClosed = false;
                localStorage.setItem('sidebar-open', true);
                localStorage.removeItem('sidebar-closed');
            }
        },
    },
};
