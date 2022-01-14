import Picker from './Picker.vue'

// let users = {
//     statusCode: 200,
//     body:
//         {
//             "users":[{"id":1,"title":'Charles'},{"id":2,"title":'Leslie'},{"id":3,"title":'Mike'},{"id":4,"title":'Isabel'}],
//             "links":{"first":"http:\/\/app.test\/years?page=1","last":"http:\/\/app.test\/years?page=1","prev":null,"next":null},
//             "meta":{"current_page":1,"from":1,"last_page":1,"links":[{"url":null,"label":"&laquo; Previous","active":false},{"url":"http:\/\/app.test\/years?page=1","label":"1","active":true},{"url":null,"label":"Next &raquo;","active":false}],"path":"http:\/\/app.test\/years","per_page":15,"to":4,"total":4}
//         }
// }

let singleUser = {
    statusCode: 200,
    body:
        {"user": {"id": 1, "title": 'Charles'}}
}

describe('Picker', () => {

    it('is filled via object', () => {
        cy.mount(<Picker
            name="user_id"
            fill={{id: 1, title: 'Charles'}}
            item-display="title"
            modelValue={1}
        />)

        cy.get('[data-test="picker-user_id"]').should('have.value', 'Charles')
    })

    it('can be filled via ajax endpoint', () => {
        cy.intercept('/users/1', singleUser)

        cy.mount(<Picker
            name="user_id"
            fill="/users/1"
            item-display="title"
            item-path="user"
            modelValue={1}
        />)

        cy.get('[data-test="picker-user_id"]').should('have.value', 'Charles')
    })

    it('can be filled via a object that provides the ajax endpoint', () => {
        cy.intercept('/users/1', singleUser)

        window.route = (name, params) => {
            return '/users/' + params.user
        }

        cy.mount(<Picker
            name="user_id"
            fill={{ route: 'users.show', user: 1}}
            item-path="user"
            item-display="title"
            modelValue={1}
        />)

        cy.get('[data-test="picker-user_id"]').should('have.value', 'Charles')
    })
})
