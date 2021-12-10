export default {
    props: ['connect'],
    inject: ['$connectedComponents'],
    beforeMount() {
        if (!this.connect) return;

        this.$connectedComponents.register(this.connect);
    },
    methods: {
        connectChanged(event, payload) {
            this.$connectedComponents.for(this.connect).dispatch(event, payload);
        },
        onConnectChange(event, callback) {
            this.$connectedComponents.for(this.connect).listen(event, callback);
        },
    },
};
