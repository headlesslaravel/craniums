import Breadcrumbs from './Breadcrumbs.vue'

describe('Breadcrumbs', () => {

    it('accepts a single key', () => {

        cy.mount(<Breadcrumbs
            current="index"
            options={[
                {
                    key: 'index',
                    display: 'Vehicles',
                    href: '/vehicles',
                },
                {
                    key: 'show',
                    display: 'Toyota',
                    href: '/vehicles/toyota',
                },
            ]}
        />)

        cy.get('[data-test="crumb"]').should('have.length', 1)
        cy.get('[data-test="crumb"]').should('have.text', 'Vehicles')
        cy.get('[data-test="crumb"]').should('have.attr', 'href', '/vehicles')
    })

    it('accepts an array of keys', () => {

        cy.mount(<Breadcrumbs
            current={['index', 'show']}
            options={[
                {
                    key: 'index',
                    display: 'Vehicles',
                    href: '/vehicles',
                },
                {
                    key: 'show',
                    display: 'Toyota',
                    href: '/vehicles/toyota',
                },
            ]}
        />)

        cy.get('[data-test="crumb"]').should('have.length', 2)
        cy.get('[data-test="crumb"]').eq(0).should('have.text', 'Vehicles')
        cy.get('[data-test="crumb"]').eq(0).should('have.attr', 'href', '/vehicles')
        cy.get('[data-test="crumb"]').eq(1).should('have.text', 'Toyota')
        cy.get('[data-test="crumb"]').eq(1).should('have.attr', 'href', '/vehicles/toyota')
    })

})
