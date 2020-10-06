describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'hanlin',
      name: 'Han Lin Khaing',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login into Application')
  })

  describe('Login', function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('hanlin')
      cy.get('#password').type('54321')
      cy.get('#login').click()

      cy.get('#message').should('contain', 'invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hanlin')
      cy.get('#password').type('12345')
      cy.get('#login').click()

      cy.get('h4').should('contain', 'Han Lin Khaing logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hanlin', password: '12345' })
    })

    it('A blog can be created', function() {
      cy.get('#toggle').click()

      cy.get('#title').type('How to drink water!!!')
      cy.get('#author').type('Anonymous')
      cy.get('#url').type('https://www.google.com')
      cy.get('#create').click()

      cy.get('#message').should('contain', 'a new blog How to drink water!!! by Anonymous added')
      cy.get('.blog').should('contain', 'How to drink water!!! by Anonymous')
    })

    describe('With a blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'How to drink water!!!',
          author: 'Anonymous',
          url: 'https://www.google.com'
        })
      })

      it('User can like blogs', function() {
        cy.get('.blog').contains('How to drink water!!! by Anonymous')
          .parent().find('#changeButton').click()

        cy.get('.blog').contains('How to drink water!!! by Anonymous')
          .parent().find('#likeButton').click()

        cy.get('.blog').contains('likes 1')
      })

      it('User can delete her blog', function() {
        cy.get('.blog').contains('How to drink water!!! by Anonymous')
          .parent().find('#changeButton').click()

        cy.get('.blog').contains('How to drink water!!! by Anonymous')
          .parent().find('#removeButton').click()

        cy.on('window:confirm', () => true)

        cy.get('#message').should('contain', 'successfull deleted')
      })

      it('Blogs are order by likes', function() {
        cy.createBlog({
          title: 'How to open door!!!',
          author: 'Anonymous',
          url: 'https://www.google.com',
          likes: 3
        })
        cy.createBlog({
          title: 'How to close door!!!',
          author: 'Anonymous',
          url: 'https://www.google.com',
          likes: 15
        })

        cy.get('.changeButton').click({ multiple: true })

        cy.get('.likes').then(($div) => {
          cy.wrap($div[0]).should('contain', 'likes 15')
        })
      })
    })
  })
})