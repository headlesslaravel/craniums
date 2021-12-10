import get from 'lodash.get';

export default class DataWrapper {
    constructor(data) {
        this.data = data;
        this.cached = {};
    }

    has(key) {
        return this.get(key) != null;
    }

    get(key, fallback) {
        if (fallback === undefined) {
            fallback = null;
        }

        if (this.cached.hasOwnProperty(key)) {
            return this.cached[key];
        }

        this.cached[key] = get(this.data, key, fallback);

        return this.cached[key];
    }
}
