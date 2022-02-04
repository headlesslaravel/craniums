<template>
  <div v-if='links && links.length > 0'>
    <div v-if="paginate === 'numbers' && links.length > 3">
      <div class="flex flex-wrap -mb-1">
        <template v-for="(link, key) in links" :key="key">
          <div
            v-if="link.url === null"
            class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
            v-html="link.label"
          />
          <button
            v-else
            :class="{ 'bg-white': link.active }"
            :href="link.url"
            class="bg-gray-50 mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:border-black focus:border-indigo-500 focus:text-indigo-500"
            @click="visit(link.url)"
            v-html="link.label"
          />
        </template>
      </div>
    </div>
    <div v-else>
      <button
        :href="links[currentLinkIdx].url"
        class="bg-gray-50 mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:border-black focus:border-indigo-500 focus:text-indigo-500"
        @click="goToNextLink()"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<script>
import Connect from '../Mixins/Connect.js';

export default {
    mixins: [Connect],
    props: {
        links: Array,
        paginate: String
    },
    data () {
        return {
          currentLinkIdx: 0
        }
    },
    methods: {
        visit(url) {
            if (this.connect) {
                this.connectChanged('updateUrl', url);
                return;
            }

            this.$inertia.visit(url);
        },
        goToNextLink() {
          if (this.links[this.currentLinkIdx + 1] && this.links[this.currentLinkIdx + 1].url) {
            this.currentLinkIdx++
            this.visit(this.links[this.currentLinkIdx].url)
          }
        }
    },
};
</script>
