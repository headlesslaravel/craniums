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
import Count from './Count.vue'
import Bar from './Bar.vue'
import Line from './Line.vue'
import Donut from './Donut.vue'
import Table from './Table.vue'
import Html from './Html.vue'

export default {
    props: ['url', 'filters'],
    inject: ['config'],
    components: {
        Html,
        Count,
        Bar,
        Line,
        Donut,
        Table,
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
            let key = this.$.vnode.key;
            let url = this.url ? this.url : route(`cards.${key}.index`)

            if(this.filters) {
                return url + '?' + this.queryString()
            }
            return url
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
                card.component = card.component ?? 'count'
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
