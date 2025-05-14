describe('Login Test', function () {
  beforeEach(function () {
    cy.fixture('credentials').as('user');
  });

  it('should login successfully with valid credentials', function () {
    cy.visit('/');
    cy.contains('Signup / Login').click();

    cy.get('input[data-qa="login-email"]').type(this.user.email);
    cy.get('input[data-qa="login-password"]').type(this.user.password);
    cy.get('button[data-qa="login-button"]').click();

    cy.contains('Logged in as').should('be.visible');
  });
});
