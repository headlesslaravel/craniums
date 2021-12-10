import Table from './Table.vue'

describe('Table cells', () => {

    it('with cells as an array', () => {
        cy.mount(
            <Table
                cells={['title', 'description']}
                data={[{title: 'Titanic', description: 'a movie'}]}
            />
        )

        cy.get('th').eq(0).should('have.text', 'title')
        cy.get('th').eq(1).should('have.text', 'description')
        cy.get('td').eq(0).should('have.text', 'Titanic')
        cy.get('td').eq(1).should('have.text', 'a movie')
    })

    it('with nested cells', () => {
        cy.mount(
            <Table
                data={[{user: {name: 'Brian'}}]}
                cells={['user.name']}
            />)

        cy.get('th').eq(0).should('have.text', 'user')
        cy.get('td').eq(0).should('have.text', 'Brian')
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
        cy.get('th').eq(1).should('have.text', 'description')
    })
})

