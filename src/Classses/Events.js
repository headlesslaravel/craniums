export default class Events {
    events = {};

    listen(event, callback) {
        if (this.events.hasOwnProperty(event)) {
            this.events[event].push(callback);
        } else {
            this.events[event] = [callback];
        }
    }

    dispatch(event, payload) {
        if (!this.events[event]) return;

        this.events[event].forEach((callback) => {
            callback(payload);
        });
    }
}
