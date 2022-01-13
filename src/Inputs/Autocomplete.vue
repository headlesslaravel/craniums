<template>
    <div>
        <div v-if="modelValue == null">
            <input type="text" v-model="term" ref="input" class="w-full border mb-5" :placeholder="placeholder">
            <div v-for="option in options" @click="select(option)" class="text-gray-500 cursor-pointer hover:text-black">
                {{ option[itemDisplay] }}
            </div>
        </div>
        <div v-else>
            <input type="text" :value="modelValue[itemDisplay]" class="w-full border mb-5" @focus="clear" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import get from 'lodash.get'

export default {
    props: {
        modelValue: Object,
        placeholder: String,
        itemDisplay: {
            type: String,
            default: 'id'
        },
        itemsPath: {
            type: String,
        },
        routeName: String,
        request: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            term: null,
            options: []
        }
    },
    methods: {
        select(option) {
          this.$emit('update:modelValue', option)
        },
        clear() {
            this.term = null
            this.options = []
            this.$emit('clear')
        },
        getOptions() {
            axios.request({
                url: route(this.routeName, {search: this.term, ...this.request}),
                method: 'get',
                headers: {'Wants-Json': true}
            }).then(response => {
                this.options = get(response.data, this.itemsPath)
            })
        }
    },
    watch: {
        modelValue(modelValue) {
            if(!modelValue) {
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            }
        },
        term(term) {
            if(term) {
                this.getOptions()
            } else {
                this.options = []
            }
        }
    }
}
</script>
