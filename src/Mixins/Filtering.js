export default {
    methods: {
        filter(key, fallback = null) {
            let search = window.location.search;

            if (this.connect) {
                search = localStorage.getItem(this.connect);
            }

            let parameters = new URLSearchParams(search);

            return parameters.get(key) ?? fallback;
        },
    },
};
