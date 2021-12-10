<template>
    <span :test="`timestamp-${type}`" :title="title" v-text="display"/>
</template>

<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export default {
    props: {
        value: String,
        type: {
            default: 'default',
        },
    },

    data() {
        return {
            display: null,
            title: null,
        };
    },

    beforeMount() {
        if (!this.value) {
            return;
        }

        let date = new Date(this.value);

        this.title = date.toLocaleString();

        if (this.type === 'default') {
            this.display = this.title;
        } else if (this.type === 'date') {
            this.display = date.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
            });
        } else if (this.type === 'time') {
            this.display = date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
        } else if (this.type === 'mini') {
            const timeAgo = new TimeAgo('en-US');
            this.display = timeAgo.format(date, 'mini');
        } else if (this.type === 'relative') {
            const timeAgo = new TimeAgo('en-US');
            this.display = timeAgo.format(date);
        }
    },
};
</script>
