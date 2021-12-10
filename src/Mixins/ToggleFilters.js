export default {
    data() {
        return {
            filtersAreOpen: true,
        };
    },
    beforeMount() {
        if (localStorage.getItem(`filtering-${window.location.pathname}`)) {
            this.filtersAreOpen = true;
        }
    },
    methods: {
        toggleFilter() {
            if (this.filtersAreOpen) {
                this.filtersAreOpen = false;
                localStorage.removeItem(`filtering-${window.location.pathname}`);
            } else {
                this.filtersAreOpen = true;
                localStorage.setItem(`filtering-${window.location.pathname}`, true);
            }
        },
    },
};
