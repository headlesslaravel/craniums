<template>
    <div>
        <button @click="open = true">Import</button>
        <modal :show="open" @close="open = false">
            <div v-if="success" class="p-10 text-center">
                <div class="flex items-center text-center justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <p>Your file has been uploaded and import is in progress.</p>
                <p>A confirmation email will be sent when finished.</p>
                <p>The email will indicate any import errors.</p>
                <div class="text-center mt-5">
                    <button @click="open = false" class="border px-5 py-2 rounded">Close</button>
                </div>
            </div>
            <div v-else>
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
                <Form :action="store" :fields="['file:Select file to import']" @success="success = true" @cancel="open = false">
                    <template #field.file="{ values }">
                        <input type="file" @change="values.file = $event.target.files[0]">
                    </template>
                </Form>
            </div>
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
            open: false,
            success: false,
        }
    }
}
</script>
