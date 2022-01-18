<template>
    <div>
        <button @click="open = true">Import</button>
        <modal :show="open" @close="open = false">
            <p class="p-5 text-2xl border-b">Import</p>
            <Form :action="url" :fields="['file']" @success="success">
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
        url: {
            type: String,
            required: true
        }
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
