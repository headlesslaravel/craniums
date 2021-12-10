<template>
    <slot :active="active" :show="show" name="tabs">
        <div class="flex border-b px-5 -mx-5">
            <div
                v-for="tab in tabsFormatted"
                :class="{
          'border-black text-black hover:border-black hover:text-black':
            active === tab.key,
        }"
                class="px-5 cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-5 border-b-2 font-medium text-sm"
                @click="show(tab)"
            >
        <span v-if="tab.allowed">
          <slot :active="active === tab.key" :name="`tab.${tab.key}`">
            <span class="capitalize inline-block">
              {{ tab.display }}
            </span>
          </slot>
        </span>
            </div>
        </div>
    </slot>
    <div v-for="tab in tabsFormatted">
        <div v-if="tab.allowed && tab.key === active">
            <slot :name="`content.${tab.key}`"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: () => ['overview'],
        },
    },
    beforeMount() {

        if (location.hash) {
            this.active = location.hash.replace('#', '');
            history.replaceState(null, null, location.hash);
        } else {
            this.active = this.tabsFormatted[0].key;
        }
    },
    data() {
        return {
            active: null,
        };
    },
    computed: {
        tabsFormatted() {
            let output = [];

            this.tabs.forEach((tab) => {
                if (typeof tab === 'string') {
                    output.push({
                        key: tab,
                        display: tab.replaceAll('_', ' '),
                        allowed: true,
                    });
                } else if (typeof tab === 'object') {
                    // {key: boolean}
                    let keys = Object.keys(tab);

                    if (keys.length === 1) {
                        output.push({
                            key: keys[0],
                            display: keys[0].replaceAll('_', ' '),
                            allowed: tab[keys[0]],
                        });
                    } else {
                        output.push(tab);
                    }
                }
            });

            return output;
        },
    },
    methods: {
        show(tab) {
            this.active = tab.key;
            history.replaceState(null, null, `#${tab.key}`);
        },
    },
};
</script>
