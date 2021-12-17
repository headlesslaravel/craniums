import Repeater from './Repeater.vue'

// <repeater :fields="['title', 'description']" v-model="form.products">
//     <template #row="{ row }">
    //     <input type="text" v-model="row.title">
    //     <input type="text" v-model="row.description">
//     </template>
// </repeater>

describe('Repeater', () => {

    it('does something', () => {
        cy.mount(<Repeater/>)
    })

})
