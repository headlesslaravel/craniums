<template>
    <div class="block w-full h-full">
        <form class="block w-full h-full">
            <input
                id="search-field"
                name="search-field"
                class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search.."
                autocomplete="off"
                v-model="term"
                type="search"
            />
        </form>
        <div class="z-50 bg-white shadow-lg border-t p-5" v-if="results.length">
            <div v-for="result in results">
                <div v-if="result.data.length">
                    <span class="font-bold py-2 block capitalize border-b mb-2">
                        {{ result.meta.group }}
                    </span>
                    <ul class="pl-5">
                        <li v-for="item in result.data" class="py-1 hover:text-black transition-all">
                            <Link :href="route(result.meta.route, item.value)">
                                {{ item.display }}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {Link} from '@inertiajs/inertia-vue3'

export default {
    components: {
        Link
    },
    props: {
        url: {String}
    },
    data() {
      return {
          term: '',
          results: {}
      }
    },
    methods: {
        search() {
            if(!this.term) {
                this.results = {}
                return;
            }

            axios.get('/'+this.url.trim('/')+'?term='+this.term).then(response => {
                this.results = response.data.data;
            })
        }
    },
    watch: {
        term(term) {
            if(!term) {
                this.results = {}
            } else {
                this.search()
            }
        }
    }
}
</script>
