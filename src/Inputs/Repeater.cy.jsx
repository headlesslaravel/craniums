import Repeater from './Repeater.vue'

describe('Repeater', () => {

    it('does something', () => {
        cy.mount(<Repeater/>)
    })

    it('handles laravel error format', () => {
        cy.mount(<Repeater errors={[

        ]}/>)
    })

})
