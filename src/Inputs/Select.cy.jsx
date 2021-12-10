import Select from './Select.vue'

describe('Select', () => {

    it.skip('has computed options', () => {
        let wrapper = cy.mount(<Select/>, {
            props: {
                options: ['one', 'two']
            }
        })

        // How to call a computed method?
        // console.log(wrapper.formattedOptions())
    })
})
