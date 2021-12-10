import Form from './Form.vue'

describe('Form Setup', () => {

    it('renders form element with attributes', () => {
        cy.mount(<Form/>, {
            props: {
                method: 'POST',
                action: '/users/new',
            }
        })

        cy.get('form')
            .invoke('attr', 'action')
            .should('eq', '/users/new')

        cy.get('form')
            .invoke('attr', 'method')
            .should('eq', 'POST')
    })
})

describe('Form Fields', () => {

    it('with a flat array of field names', () => {
        cy.mount(<Form/>, {
            props: {
                action: '/users/new',
                fields: ['title', 'description']
            }
        })

        cy.get('form input').should('have.length', 2)
        cy.get('label[for="title"]').should('contain.text', 'Title')
        cy.get('label[for="description"]').should('contain.text', 'Description')
        cy.get('input[name="title"]').should('exist').should('not.have.value')
        cy.get('input[name="description"]').should('exist').should('not.have.value')
    })

    it('with values when passed a values object', () => {
        cy.mount(<Form/>, {
            props: {
                fields: ['title', 'description'],
                values: {title: 'Titanic', description: 'row row row your boat'}
            }
        })

        cy.get('input[name="title"]').should('have.value', 'Titanic')
        cy.get('input[name="description"]').should('have.value', 'row row row your boat')
    })

    it('with a values object only', () => {
        cy.mount(<Form/>, {
            props: {
                values: {title: 'Titanic', description: 'row row row your boat'}
            }
        })

        cy.get('input[name="title"]').should('have.value', 'Titanic')
        cy.get('input[name="description"]').should('have.value', 'row row row your boat')
    })

    it('with a values object and excludes', () => {
        cy.mount(<Form/>, {
            props: {
                action: '/users/new',
                exclude: ['description'],
                values: {title: 'Titanic', description: 'row row row your boat'}
            }
        })

        cy.get('input[name="title"]').should('have.value', 'Titanic')
        cy.get('input[name="description"]').should('not.exist')
    })

    it('with an object', () => {
        cy.mount(<Form/>, {
            props: {
                fields: [
                    {name: 'title'},
                    {name: 'description'},
                ]
            }
        })

        cy.get('label[for="title"]').should('contain.text', 'Title')
        cy.get('label[for="description"]').should('contain.text', 'Description')
        cy.get('input[name="title"]').should('exist')
        cy.get('input[name="description"]').should('exist')
    })

    it('with an object & default value', () => {
        cy.mount(<Form/>, {
            props: {
                fields: [
                    {name: 'title', value: 'Titanic'},
                    {name: 'description'},
                ]
            }
        })

        cy.get('input[name="title"]').should('have.value', 'Titanic')
        cy.get('input[name="description"]').should('not.have.value')
    })

    it('with an object & width span', () => {
        cy.mount(<Form/>, {
            props: {
                fields: [
                    {name: 'title', span: 6},
                    {name: 'description', span: 3},
                    {name: 'author_id'}
                ]
            }
        })

        cy.get('[data-test="field-title"]').should('have.class', 'col-span-6')
        cy.get('[data-test="field-description"]').should('have.class', 'col-span-3')
        cy.get('[data-test="field-author_id"]').should('have.class', 'col-span-12')
    })
})

describe('Form Field Extras', () => {

    it('with a divider', () => {

        cy.mount(<Form/>, {
            props: {
                fields: [
                    {name: 'title'},
                    {divider: true},
                    {name: 'description'},
                ]
            }
        })

        cy.get('[data-test="field-title"]')
            .siblings('[data-test="field-divider"]')
            .should('have.length', 1)

        cy.get('[data-test="field-divider"]')
            .siblings('[data-test="field-description"]')
            .should('have.length', 1)
    })

    it('with a section titles', () => {

        cy.mount(<Form/>, {
            props: {
                fields: [
                    {name: 'title'},
                    {section_title: 'Some title'},
                    {name: 'description'},
                ]
            }
        })

        cy.get('[data-test="field-title"]')
            .siblings('[data-test="field-section_title"]')
            .should('have.length', 1)
            .should('have.text', 'Some title')

        cy.get('[data-test="field-section_title"]')
            .siblings('[data-test="field-description"]')
            .should('have.length', 1)
    })
})

describe('Form Field Slots', () => {
    it('overrides entire field block via slot', () => {
        cy.mount(<Form/>, {
            props: {
                fields: ['title', 'description']
            },
            slots: {
                'field.title.all': ({values}) => (
                    <div>
                        <span id="test_output" vText={values.title}/>
                        <input name="title" vModel={values.title}/>
                    </div>
                )
            }
        });

        cy.get('form input').should('have.length', 2)
        cy.get('label[for="title"]').should('not.exist')
        cy.get('label[for="description"]').should('contain.text', 'Description')
        cy.get('input[name="title"]').should('exist').should('not.have.value')
        cy.get('input[name="description"]').should('exist').should('not.have.value')
        cy.get('input[name="title"]').type('hello world')
        cy.get('span#test_output').should('have.text', 'hello world')
    })

    it('overrides a field block input and keep label & error', () => {

        cy.mount(<Form/>, {
            props: {
                fields: ['title', 'description']
            },
            slots: {
                'field.title': ({values}) => (
                    <div>
                        <span id="test_output" vText={values.title}/>
                        <input name="title" vModel={values.title}/>
                    </div>
                )
            }
        });

        cy.get('form input').should('have.length', 2)
        cy.get('label[for="title"]').should('contain.text', 'Title')
        cy.get('label[for="description"]').should('contain.text', 'Description')
        cy.get('input[name="title"]').type('hello world')
        cy.get('span#test_output').should('have.text', 'hello world')
    })
})

describe('Form Buttons', () => {

    it('submit button is "create" by default', () => {
        cy.mount(<Form/>)

        cy.get('button[type="submit"]').should('have.text', 'Create')
    })

    it('submit button is "update" when passed values', () => {
        cy.mount(<Form/>, {
            props: {
                fields: ['title'],
                values: {title: 'Hello'}
            }
        })

        cy.get('button[type="submit"]').should('have.text', 'Update')
    })

    it('cancel button does not exist by default', () => {
        cy.mount(<Form/>, {
            props: {
                fields: ['title'],
                values: {title: 'Hello'}
            }
        })

        cy.get('button[data-test="cancel"]').should('not.exist')
    })

    it('cancel button exists when form has cancel listener', () => {
        cy.mount(<Form onCancel={() => {
        }}/>)

        cy.get('button[data-test="cancel"]').should('exist')
    })
})

describe('Form Submit', () => {

    it('submits successfully', () => {

        let handler = {
            request(request) {
                return new Promise((resolutionFunc, rejectionFunc) => {
                    resolutionFunc({
                        data: {
                            message: "Mocked handler worked",
                            url: request.url,
                            method: request.method,
                            data: {
                                title: request.data.title,
                                description: request.data.description,
                            }
                        }
                    });
                });
            }
        }

        let onSuccessSpy = cy.spy().as('onSuccessSpy')

        cy.mount(
            <Form
                action="/movies/new"
                fields={['title', 'description']}
                handler={handler}
                onSuccess={onSuccessSpy}
            />
        )

        cy.get('input[name="title"]').type('Titanic')
        cy.get('input[name="description"]').type('row row your boat')
        cy.get('button[type="submit"]').click()

        cy.get("@onSuccessSpy").should('have.been.calledWith', {
            message: "Mocked handler worked",
            url: '/movies/new',
            method: 'post',
            data: {
                title: 'Titanic',
                description: 'row row your boat',
            }
        })
    })

    it.skip('renders single error message for field', () => {
        cy.get('div[data-test="error"]').should('have.length', 1)
        cy.get('div[data-test="error"]').first().should('have.text', 'The title field is required.')
        // cy.wait('@formSubmit').then((interception) => {
        //     cy.get('div[data-test="error"]').should('have.length', 1)
        //     cy.get('div[data-test="error"]').first().should('have.text', 'The title field is required.')
        // })
    })
})
