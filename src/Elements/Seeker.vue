<template>
    <div class="block w-full h-full relative">
        <form class="block w-full h-full z-20 relative">
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
        <div v-if="results.length" class="z-50 bg-white shadow-lg border-t absolute w-2/3 overflow-auto" style="max-height: 400px">
            <div v-if="mode === 'tab'">
                <div class="flex space-x-5 p-5 border-b sticky top-0 bg-white">
                    <div v-for="result in results" :key="result.meta.resource">
                        <div v-if="result.data.length">
                            <span @click="tab = result.meta.resource" class="cursor-pointer hover:underline" :class="{'font-bold': tab === result.meta.resource}">
                                {{ display(result.meta.resource) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-for="result in results" :key="result.meta.resource">
                        <div v-if="tab === result.meta.resource && result.data.length">
                            <Link :href="route(result.meta.route, item.value)" v-for="item in result.data" :key="result.meta.resource+item.value" class="truncate block px-5 py-4 text-sm border-b hover:bg-gray-50 transition-all">
                                {{ item.display }}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {Link} from '@inertiajs/inertia-vue3'
import {capitalize} from "vue";

export default {
    components: {
        Link
    },
    props: {
        url: {String},
        mode: {
            type: String,
            default: 'tab',
        }
    },
    data() {
      return {
          term: '',
          tab: '',
          results: {}
      }
    },
    methods: {
        display(resource) {
            return capitalize(resource.replaceAll('-', ' '))
        },
        search() {
            if(!this.term) {
                this.results = {}
                return;
            }

            axios.get(this.url.trim('/')+'?term='+this.term).then(response => {
                let withResults = response.data.data.filter(result => {
                    return result.data.length
                })

                this.tab = withResults[0].meta.resource;

                this.results = withResults;
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
