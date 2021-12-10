import Finder from './Finder.vue'

describe('Finder Setup', () => {

    it('can search', () => {
        const onSearchSpy = cy.spy().as('onSearchSpy')
        cy.mount(<Finder onSearch={onSearchSpy}/>)
        cy.get('input[name="search"]').type('h')
        cy.get('@onSearchSpy').should('have.been.calledOnceWithExactly', {search: 'h'})
    })

    it('can sort ascending', () => {
        const onSortSpy = cy.spy().as('onSortSpy')
        cy.mount(<Finder onSort={onSortSpy} sort={['title']}/>)
        cy.get('select[name="sort"]').select('Title (asc)')
        cy.get('@onSortSpy').should('have.been.calledOnceWithExactly', {'sort': 'title'})
    })

    it('can sort descending', () => {
        const onSortSpy = cy.spy().as('onSortSpy')
        cy.mount(<Finder onSort={onSortSpy} sort={['title']}/>)
        cy.get('select[name="sort"]').select('Title (desc)')
        cy.get('@onSortSpy').should('have.been.calledOnceWithExactly', {"sort-desc": "title"})
    })

    it('can view with trashed', () => {
        const onTrashSpy = cy.spy().as('onTrashSpy')
        cy.mount(<Finder onTrash={onTrashSpy} trashed={true}/>)
        cy.get('select[name="trash"]').select('With Trashed')
        cy.get('@onTrashSpy').should('have.been.calledOnceWithExactly', {"with-deleted": 'true'})
    })

    it('can view only trashed', () => {
        const onTrashSpy = cy.spy().as('onTrashSpy')
        cy.mount(<Finder onTrash={onTrashSpy} trashed={true}/>)
        cy.get('select[name="trash"]').select('Only Trashed')
        cy.get('@onTrashSpy').should('have.been.calledOnceWithExactly', {"only-deleted": 'true'})
    })
})
