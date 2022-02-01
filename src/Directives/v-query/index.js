import { Inertia } from '@inertiajs/inertia';
import Query from './query.js';

let nav = (parameters) => {
    Inertia.get(
        window.location.pathname,
        parameters,
        { preserveState: true },
    );
}

export default {

    install: (app, options) => {
        app.directive('query', {

            mounted: (el, binding) => {
                el.v_query = new Query(binding, nav)
                el.v_query.bind(el)
            },

            beforeUnmount: (el) => {
                el.v_query.unbind(el)
            },

            updated: (el, binding) => {
                el.v_query.unbind(el)
                el.v_query = new Query(binding, nav)
                el.v_query.bind(el)
            },
        })
    }
}
