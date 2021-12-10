import Connect from './Connect';
import get from 'lodash.get';

export default {
    mixins: [Connect],
    props: {
        url: String,
        cells: Array,
        data: Object,
        click: [String, Function],
        wrapperClass: String,
        itemClass: String,
        itemsPath: {
            default: 'data',
        },
        itemDisplay: {
            type: String,
            default: 'id',
        },
        itemKey: {
            type: String,
            default: 'id',
        },
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(data) {
                data = !data ? [] : data;
                this.setItems(data);
                this.setLinks(data);
            },
        },
    },
    created() {
        if (!this.url) return;

        this.currentUrl = this.url;

        this.onConnectChange('updateUrl', (url) => {
            this.currentUrl = url;
            this.get(url);
        });

        this.onConnectChange('refresh', () => {
            this.get(this.currentUrl);
        });

        this.onConnectChange('updateQuery', (payload) => {
            let existing = new URL(this.url);
            let override = Object.fromEntries(existing.searchParams.entries());
            payload = Object.assign(payload, override);
            let queryString = new URLSearchParams(payload).toString();
            this.currentUrl = existing.pathname + '?' + queryString;
            this.get(this.currentUrl);
        });
    },
    mounted() {
        if (this.url) {
            this.get(this.url);
        }
    },
    data() {
        return {
            items: [],
            links: [],
        };
    },
    computed: {
        ajax() {
            return this.url != null;
        },
        cursorWhenClickable() {
            if (this.click) {
                return ' cursor-pointer';
            }
        },
    },
    methods: {
        visit(entry) {
            if (this.click === undefined) {
                return;
            }
            if (typeof this.click === 'string') {
                return this.$inertia.visit(route(this.click, entry[this.itemKey]));
            }

            this.click(entry);
        },
        get(url) {
            axios
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Wants-Json': true,
                    },
                })
                .then((response) => {
                    this.setItems(response.data);
                    this.setLinks(response.data);
                });
        },

        setItems(data) {
            this.items = get(data, this.itemsPath, data);
        },
        setLinks(data) {
            if (!data) {
                this.links = [];
                return false;
            } else if (data.meta && data.meta.links) {
                this.links = data.meta.links;
            } else if (data.links) {
                this.links = data.links;
            } else {
                this.links = [];
            }
        },
    },
};
