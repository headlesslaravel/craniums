<template>
    <div>
        <button @click="open = true">Import</button>
        <modal :show="open" @close="open = false">
            <div class="p-5 text-2xl border-b flex justify-between items-center">
                <div>Import</div>
                <div v-if="create" class="text-sm">
                    <a :href="create" class="text-gray-400 hover:text-gray-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span>Template</span>
                    </a>
                </div>
            </div>
            <Form :action="store" :fields="['file:Select file to import']" @success="success" @cancel="open = false">
                <template #field.file="{ values }">
                    <input type="file" @change="values.file = $event.target.files[0]">
                </template>
            </Form>
        </modal>
    </div>
</template>
<script>
import Modal from "../../Jetstream/Modal.vue";
import Form from "./Form.vue";

export default {
    components: {Modal, Form},
    props: {
        store: {
            type: String,
            required: true
        },
        create: String,
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        success() {
            this.$inertia.get(route(route().current(), {'sort-desc': 'created_at'}))
        }
    }
}
</script>
