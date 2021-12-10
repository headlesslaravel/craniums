import Events from './Events';

export default class ConnectedComponents {
    connections = {};

    register(key) {
        if (this.connections.hasOwnProperty(key)) {
            return;
        }

        this.connections[key] = new Events();
    }

    for(key) {
        if (this.connections.hasOwnProperty(key)) {
            return this.connections[key];
        }

        return new Events();
    }
}
