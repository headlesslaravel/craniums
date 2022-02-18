<template>
    <select
        class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
        v-bind="$attrs"
        @change="filtered"
    >
        <option v-if="empty" value="">{{ empty }}</option>
        <option
            v-for="option in formattedOptions"
            :data-name="option.name"
            :value="option.value"
        >
            {{ option.display }}
        </option>
    </select>
</template>
<script>
export default {
    props: {
        empty: String,
        url: String,
        options: {
            default: [],
            type: [Object, Array],
        },
        default: String,
    },
    beforeMount() {
        if (this.url) {
            axios.get(this.url).then((response) => {
                this.selectOptions = response.data;
            });
        } else {
            this.selectOptions = this.options;
        }
    },
    data() {
        return {
            selectOptions: [],
        };
    },
    methods: {
        filtered(event) {
            // one less to account for default option
            let index = this.empty
                ? event.target.selectedIndex - 1
                : event.target.selectedIndex;

            localStorage.setItem(
                'filters',
                JSON.stringify(this.formattedOptions[index])
            );
        },
    },
    computed: {
        formattedOptions() {
            if (this.url) {
                return this.selectOptions.data;
            }
            if (
                Array.isArray(this.options) &&
                this.options.length &&
                typeof this.options[0] === 'object'
            ) {
                return this.options;
            }

            let options = [];

            if (
                Array.isArray(this.options) &&
                this.options.length &&
                this.options[0] !== 'object'
            ) {
                this.options.forEach((option) => {
                    options.push({display: option, value: option});
                });
                return options;
            }

            Object.keys(this.options).forEach((key) => {
                options.push({display: this.options[key], value: key});
            });

            return options;
        },
    },
};
</script>
