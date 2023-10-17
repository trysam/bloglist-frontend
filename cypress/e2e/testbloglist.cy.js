describe('Blog App', () => {

  const user1 = {
    username: 'Awokunle',
    password: 'Oludare'
  }

  const user2 = {
    username: 'Admin',
    password: 'admin'
  }


  Cypress.Commands.add('createUser', (credentials) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`,credentials)
  })

  Cypress.Commands.add('login', (credentials) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, credentials).then(
      response => window.localStorage.setItem('appUser',JSON.stringify(response.body))     
    )
  })

  Cypress.Commands.add('createBlog', (blog) => {
    cy.request({
      method: 'POST', 
      url:`${Cypress.env('BACKEND')}/blogs`, 
      body: blog,
      headers:{
        Authorization:`Bearer ${JSON.parse(window.localStorage.getItem('appUser')).userToken}`
      }
    })
  })

  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser(user1)
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('blogs')
    cy.contains('Login Here').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('password')
  })

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('')
      cy.contains('blogs')
      cy.contains('Login Here').click()
    })

    it('succeeds with correct credentials', () => {     
      cy.get('#username').type('Awokunle')
      cy.get('#password').type('Oludare')
      cy.get('#login').click()
      cy.get('.success').should('contain', `Welcome ${user1.username}`)
        .and('have.css', 'outline', 'rgb(0, 128, 0) solid 2px')
    })
  
    it('fails with wrong credentials ', () => {
      cy.get('#username').type('Awokunle')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.get('.error').should('contain','Wrong Credentials')
        .and('have.css', 'outline', 'rgb(255, 0, 0) solid 2px')
    }) 

  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login(user1)
      cy.createBlog({
        title: 'Cypress is great',
        author: 'Cypress',
        likes: 1,
        url: 'https://cypreess.com'
      })      
    })

    it('A blog can be created', () => {
      cy.createBlog({
        title: 'I can do all things in Christ',
        author: 'Folatunde',
        likes: 2,
        url: 'https://folatunde.com'
      })
    })

    it('User can like a blog', () => {
      cy.createBlog({
        title: 'I can do all things in Christ',
        author: 'Folatunde',
        likes: 1,
        url: 'https://folatunde.com'
      })
      cy.visit('')
      cy.contains('span','I can do all things in Christ')
        .parent()
        .find('#view').click()
        .parent()
        .find('#likeButton').click()
      cy.get('#like').contains('div',2)      
    })

    it('user who created a blog can delete it',() => {
      cy.createUser(user2)
      cy.login(user2)
      cy.createBlog({
        title: 'I can do all things in Christ',
        author: 'Folatunde',
        likes: 1,
        url: 'https://folatunde.com'
      })
      cy.visit('')
      cy.get('.blog').find('#view').click({multiple:true}).get('#remove').click()
      cy.contains('"I can do all things in Christ" is deleted')
    })

    it('only the creator can see the delete button of a blog',() => {
      cy.createUser(user2)
      cy.login(user2)
      cy.createBlog({
        title: 'I can do all things in Christ',
        author: 'Folatunde',
        likes: 1,
        url: 'https://folatunde.com'
      })
      cy.visit('')
      cy.get('.blog').find('#view').click({multiple:true})
      cy.contains(user2.username).parent().find('#remove')
      cy.contains(user1.username).parent().find('#remove').should('not.exist')
    })

    it('checks that the blogs are ordered according to likes',() => {
      cy.createUser(user2)
      cy.login(user2)
      cy.createBlog({
        title: 'The title with the most likest',
        author: 'Folatunde',
        likes: 30,
        url: 'https://folatunde.com'
      })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'Balde',
        likes: 10,
        url: 'https://bolade.com'
      })

      cy.visit('')
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })



  })
})