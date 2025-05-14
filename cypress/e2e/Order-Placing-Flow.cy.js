describe('Order Placing Flow', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('user');
  });

  it('should place the order successfully', function () {
    const productName = 'Blue Top';

    // Visit and login
    cy.visit('/');
    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="login-email"]').type(this.user.email);
    cy.get('input[data-qa="login-password"]').type(this.user.password);
    cy.get('button[data-qa="login-button"]').click();

    // Search and add product
    cy.contains('Products').click();
    cy.get('input[placeholder="Search Product"]').type(`${productName}{enter}`);
    cy.get('#submit_search').click();
    cy.contains(productName).should('be.visible');
    cy.contains('Add to cart').first().click();
    cy.contains('Continue Shopping').click();

    // Go to cart and checkout
    cy.contains('Cart').click();
    cy.contains('Proceed To Checkout').click();

    // Add comment
    cy.get('.form-control').type('The product order flow is about to be completed');

    // Place order
    cy.contains('Place Order').click();
    cy.get('[data-qa="name-on-card"]').type('Mohit Singh');
    cy.get('[data-qa="card-number"]').type('4242424242424242'); // No spaces
    cy.get('[data-qa="cvc"]').type('112');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
    cy.get('[data-qa="pay-button"]').click();

    // Assertion
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  });
});
