describe("Testing form inputs",() =>{

// Visit localhost
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });


    it("Check input values in the form",() => {
        // Check name
        cy.get('[data-cy = name]')
        .type('Maby').should('have.value', 'Maby')

        // Check email
        cy.get('[data-cy = useremail]')
        .type('name@lambda.com').should('have.value', 'name@lambda.com')
        
        // Check password
        cy.get('[data-cy = enterpass]').type('123456').should('have.value', '123456')

        // Click on terms 
        cy.get('[data-cy = agree]')
        .check().should('be.checked')
        
        // // Click on terms 
        cy.get('[data-cy = submit]').click()


      });












  
}) ;

  