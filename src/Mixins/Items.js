import Connect from './Connect';
import get from 'lodash.get';
import axios from 'axios';

export default {
    mixins: [Connect],
    props: {
        url: String,
        fields: Array,
        values: Object,
        selected: Array,
        click: [String, Function],
        wrapperClass: String,
        itemClass: {
            type: String,
            default: (props) => {
                if(props.click) {
                    return 'cursor-pointer'
                }
            }
        },
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
        refreshOnChange: {
            type: [String, Number, Boolean] // TODO: debounce 1000 so you can toggle on off quickly
        }
    },
    created() {
        if (!this.url) return;

        this.currentUrl = this.url;

        this.registerConnectListeners();
    },
    mounted() {
        if (this.url) {
            this.get(this.url);
        } else {
            this.loaded = true
        }
    },
    data() {
        return {
            items: [],
            links: [],
            loaded: false,
        };
    },
    methods: {
        visit(entry) {
            if (this.click === undefined) {
                return;
            }
            if (typeof this.click === 'string') {
                return this.$inertia.visit(route(this.click, entry[this.itemKey]));
            }

            let url = this.click(entry);

            if(url) {
                this.$inertia.visit(url);
            }
        },
        get(url) {
            this.$emit('receiving', url)

            axios
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Wants-Json': true,
                    },
                }).then((response) => {
                    let items = this.getItems(response.data)
                    let links = this.getLinks(response.data)

                    this.$emit('received', items)

                    this.items = items;
                    this.links = links;

                    if(!this.loaded) {
                        this.$emit('loaded', items)
                        this.loaded = true;
                    }
                });
        },

        getItems(values) {
            return get(values, this.itemsPath, values);
        },
        getLinks(values) {
            if (!values) {
                return [];
            } else if (values.meta && values.meta.links) {
                return values.meta.links;
            } else if (values.links) {
                return values.links;
            } else {
                return [];
            }
        },
        registerConnectListeners()
        {
            this.onConnectChange('updateUrl', (url) => {
                this.currentUrl = url;
                this.get(url);
            });

            this.onConnectChange('formSuccess', (data) => {
                this.get(this.currentUrl);
            });

            this.onConnectChange('refresh', (data) => {
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
        }
    },
    watch: {
        url(url) {
            if(url) {
                this.get(url)
            }
        },
        refreshOnChange(value) {
            if(!this.url) {
                return;
            }

            this.get(this.url)
        },
        values: {
            deep: true,
            immediate: true,
            handler(values) {
                values = !values ? [] : values;
                this.items = this.getItems(values);
                this.links = this.getLinks(values);
            },
        },
    },
};
