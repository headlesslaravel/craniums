<template>
    <div class="grid grid-cols-12 gap-6">
        <div
            v-for="card in cards"
            @click="visit(card)"
            :class="card.classes"
        >
            <component
                :is="card.component"
                :title="card.title"
                :value="card.value"
                :card="card"
                v-bind="card.props"
            />
        </div>
    </div>
</template>

<script>
import MetricCount from './MetricCount'
import CardTable from './CardTable'
export default {
    props: ['url', 'filters'],
    inject: ['config'],
    components: {
        MetricCount,
        CardTable,
    },
    data() {
        return {
            cards: []
        }
    },
    beforeMount() {
        this.request()
    },
    computed: {
        endpoint() {
            if(this.filters) {
                return this.url + '?' + this.queryString()
            }
            return this.url
        }
    },
    methods: {
        request() {
            axios.get(this.endpoint).then(response => {
                this.cards = this.format(response.data.data)
            })

            // TODO: handle validation errors
        },
        queryString() {
            // let query = JSON.parse((JSON.stringify(this.query)));
            let filters = this.filters;

            // Object.keys(query).forEach(key => {
            //     if(query[key] === 'null') {
            //         query[key] = ''
            //     }
            // })

            return (new URLSearchParams(filters).toString())
        },
        format(cards) {
            return cards.map(card => {
                card.component = card.component ?? 'metric-count'
                card.span = card.span ?? '12'
                card.classes = `border rounded col-span-${card.span}`;
                if(card.link) {
                    card.classes += ' cursor-pointer hover:border-black transition-all'
                }
                return card;
            })
        },
        visit(card) {
            if(!card.link) {
                return false
            }

            this.$inertia.get(card.link)
        }
    },
    watch: {
        filters: {
            deep: true,
            handler() {
                this.request()
            },
        }
    }
}
</script>
