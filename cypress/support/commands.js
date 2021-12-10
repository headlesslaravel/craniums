import {mount as realMount} from '@cypress/vue'
import vQuery from '../../src/Directives/v-query/index'
import DataWrapper from '../../src/Classses/DataWrapper'
import ConnectedComponents from '../../src/Classses/ConnectedComponents'
import Permissions from '../../src/Mixins/Permissions'
import ClickOutside from '../../src/Mixins/ClickOutside'
import JetPagination from '../../src/Elements/Pagination.vue'
import JetEmpty from '../../src/Items/Empty.vue'

const $ = Cypress.$

document.head.appendChild(
    $('<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">')[0]
)
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('mount', (component, options = {}) => {
    options.global = options.global || {}
    options.global.plugins = [ClickOutside, vQuery]
    options.global.mixins = [Permissions]
    options.global.components = {
        JetPagination,
        JetEmpty,
    }
    options.global.provide = {
        $connectedComponents: new ConnectedComponents(),
        config: new DataWrapper(options),
    }
    return realMount(component, options)
})
