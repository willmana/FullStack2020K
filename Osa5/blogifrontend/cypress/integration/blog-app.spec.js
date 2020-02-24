
describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page shows login-form by default', function () {
        cy.contains('log in to application')
    })

    it('login can fail', function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('login can be succesful', function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.get('.success').contains('Welcome')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'mluukkai', password: 'salainen'
            }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
        it('blog can be created', function () {
            cy.contains('Create blog').click()
            cy.get('#title').type('testblog')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress.org')
            cy.get('#create-button').click()
            cy.contains('testblog, cypress')
        })
        describe('and blog exists', function () {
            beforeEach(function () {
                cy.request({
                    url: 'http://localhost:3001/api/blogs',
                    method: 'POST',
                    body: { title: 'testblog', author: 'cypress', url: 'cypress.org' },
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.visit('http://localhost:3000')
            })
            it('blog can be liked', function () {
                cy.get('.pintatiedot').contains('view').click()
                cy.get('.tarkemmat').contains('likes 0')
                cy.get('.tarkemmat').get('#like').click()
                cy.get('.tarkemmat').contains('likes 1')
            })
            it('blog can be deleted', function () {
                cy.get('.pintatiedot').contains('view').click()
                cy.get('.tarkemmat').contains('remove').click()

                cy.get('.success').should('contain', 'Removed')
            })
        })
        describe('and many blogs exist', function () {
            beforeEach(function () {
                cy.request({
                    url: 'http://localhost:3001/api/blogs',
                    method: 'POST',
                    body: { title: 'blog2likes', author: 'cypress', url: 'cypress.org', likes: 2 },
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.request({
                    url: 'http://localhost:3001/api/blogs',
                    method: 'POST',
                    body: { title: 'blogwithmostlikes', author: 'cypress', url: 'cypress.org', likes: 3 },
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.request({
                    url: 'http://localhost:3001/api/blogs',
                    method: 'POST',
                    body: { title: 'blog1like', author: 'cypress', url: 'cypress.org', likes: 1 },
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                    }
                })
                cy.visit('http://localhost:3000')
            })
            it('blogs are sorted', function () {
                cy.get('#blogs').first().contains('blogwithmostlikes')
            })
        })
    })
})