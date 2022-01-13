import Table from './Table.vue'

describe('Table cells', () => {

    it('with cells as an array', () => {
        cy.mount(
            <Table
                cells={['title', 'description', 'meta_title']}
                data={[{title: 'Titanic', description: 'a movie', meta_title: 'Titanic'}]}
            />
        )

        cy.get('th').eq(0).should('have.text', 'Title')
        cy.get('th').eq(1).should('have.text', 'Description')
        cy.get('th').eq(2).should('have.text', 'Meta Title')
        cy.get('td').eq(0).should('have.text', 'Titanic')
        cy.get('td').eq(1).should('have.text', 'a movie')
        cy.get('td').eq(2).should('have.text', 'Titanic')
    })

    it('with cells & header as a flat array', () => {
        cy.mount(
            <Table
                cells={['title:Custom Title', 'description:Custom Description', 'meta_title:Custom Meta']}
                data={[{title: 'Titanic', description: 'a movie', meta_title: 'Titanic'}]}
            />
        )

        cy.get('th').eq(0).should('have.text', 'Custom Title')
        cy.get('th').eq(1).should('have.text', 'Custom Description')
        cy.get('th').eq(2).should('have.text', 'Custom Meta')
        cy.get('td').eq(0).should('have.text', 'Titanic')
        cy.get('td').eq(1).should('have.text', 'a movie')
        cy.get('td').eq(2).should('have.text', 'Titanic')
    })

    it('with nested cells', () => {
        cy.mount(
            <Table
                data={[{user: {name: 'Brian'}, user_account: {name: 'Personal'}}]}
                cells={['user.name', 'user_account.name', 'user_account.name:Account']}
            />)

        cy.get('th').eq(0).should('have.text', 'User')
        cy.get('th').eq(1).should('have.text', 'User Account')
        cy.get('th').eq(2).should('have.text', 'Account')
        cy.get('td').eq(0).should('have.text', 'Brian')
        cy.get('td').eq(1).should('have.text', 'Personal')
        cy.get('td').eq(2).should('have.text', 'Personal')
    })
})

describe('Table cell slots', () => {
    it('with td override', () => {
        cy.mount(
            <Table
                data={[{title: 'Titanic', description: 'a movie'}]}
                cells={['title', 'description']}
            />, {
                slots: {
                    'td.title': ({form}) => (
                        <span id="title_slot">Titanic 2</span>
                    )
                }
            })

        cy.get('td').eq(0).should('have.text', 'Titanic 2')
    })

    it('with th override', () => {
        cy.mount(
            <Table
                data={[{title: 'Titanic', description: 'a movie'}]}
                cells={['title', 'description']}
            />, {
                slots: {
                    'th.title': ({form}) => (
                        <span id="title_slot">Custom Title</span>
                    )
                }
            })

        cy.get('th').should('have.length', 2)
        cy.get('th').eq(0).should('have.text', 'Custom Title')
        cy.get('th').eq(1).should('have.text', 'Description')
    })
})

