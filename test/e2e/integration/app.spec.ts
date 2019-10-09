describe('', () => {
  before(() => {
    cy.visit('/');
  });

  it('has the correct navbar emoji', () => {
    cy.get('[data-test=main-navbar-brand]').should('contain', '🍔🍟🥤');
  });
});
