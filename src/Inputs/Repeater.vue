<template>
    <div data-test="repeater">
        <div :data-test="`repeater-${name}`">
            <repeat-item
                :name="name"
                :index="index"
                v-for="(row, index) in modelValue"
                :row="row"
                :key="ids[index]"
                :data-test="`repeater-row-${index}`"
            >
                <slot name="row.all">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <slot name="row" :row="row" :errors="localErrors[index]"/>
                        </div>
                        <div class="w-10 h-full bg-gray-50">
                            <button @click.prevent="remove(index)">
                                <slot name="remove">
                                    <svg class="h-6 w-6 text-gray-500 hover:text-black cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-test="picker-clear-make_id"><path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                                </slot>
                            </button>
                        </div>
                    </div>
                </slot>
            </repeat-item>
            <div>
                <slot name="add" :add="add">
                    <button @click="add">
                        Add Row
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import set from 'lodash.set'
import get from 'lodash.get'

let RepeatItem = {
    props: ['row'],
    template: `<slot></slot>`
}
export default {
    components: {
        RepeatItem
    },
    props: {
        name: String,
        errors: Array,
        fields: {
            required: true,
            type: Array,
            default: []
        },
        modelValue: {
            type: Array,
            default: []
        },
        tidyErrors: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            ids: [],
            localErrors: []
        }
    },
    mounted() {
        if(!Array.isArray(this.modelValue)) {
            this.$emit('update:modelValue', [])
            return;
        }

        this.modelValue.forEach((row, index) => {
            this.ids.push(`repeater-row-${index}`)
            this.localErrors.push({})
        })
    },
    methods: {
        add(event) {
            event.preventDefault()

            let id = this.modelValue.length
            this.ids.push(`repeater-row-${id}`)
            this.localErrors.push({})

            let row = {}

            this.fields.forEach(field => {
                row[field] = null
            })

            let rows = JSON.parse(JSON.stringify(this.modelValue))

            rows.push(row)

            this.$emit('update:modelValue', rows)
        },
        remove(index) {
            let rows = JSON.parse(JSON.stringify(this.modelValue))


            rows.splice(index, 1)

            this.localErrors.splice(index, 1)
            this.ids.splice(index, 1)

            this.$emit('update:modelValue', rows)
        },
    },
    watch: {
        errors: {
            immediate: true,
            deep: true,
            handler(newErrors) {
                if(!newErrors) {
                    return;
                }

                let output = {}

                Object.keys(newErrors).forEach(key => {
                    if(key.startsWith(`${this.name}.`)) {
                        set(output, key, newErrors[key])
                    }
                })

                output = get(output, this.name, [])

                if(output.length === 0) {
                    return;
                }

                output.forEach((row, index) => {
                    Object.keys(row).forEach(fieldName => {
                        let friendlyKey = fieldName.endsWith('_id')
                            ? fieldName.slice(0, -3).replaceAll('_', ' ')
                            : fieldName.replaceAll('_', ' ')

                        output[index][fieldName] = output[index][fieldName][0]
                            .replaceAll(`${this.name}.${index}.${fieldName}`, friendlyKey)
                            .replaceAll(fieldName, friendlyKey)
                    })
                })

                this.localErrors = output
            }
        }
    }
}
</script>
