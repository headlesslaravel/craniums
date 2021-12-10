import set from 'lodash.set';
import DataWrapper from '../Classses/DataWrapper';

// config[fields][bio][component]="jet-textarea"

export default {
    computed: {
        config() {
            let output = {};

            Object.keys(this.$attrs).forEach((key) => {
                if (key.startsWith('config[')) {
                    let value = this.$attrs[key];
                    key = key.replaceAll('][', '.');
                    key = key.replaceAll('[', '.');
                    key = key.replaceAll(']', '');
                    output = set(output, key, value);
                }
            });

            if (output.hasOwnProperty('config')) {
                return new DataWrapper(output.config);
            }

            return new DataWrapper({});
        },
    },
};
