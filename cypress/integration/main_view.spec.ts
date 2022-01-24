/// <reference types="cypress" />

describe('Main', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: '/salons*',
    }).as('fetchSalons');

    cy.intercept({
      method: 'GET',
      url: '/cities*',
    }).as('fetchCities');

    cy.visit('http://localhost:3000');
  });

  it('Should display salons filtered by search result', () => {
    cy.get('[data-test-id="Search input"]').type('Humans Barber Shop').type('{enter}');

    cy.wait('@fetchSalons');
    cy.get('[data-test-id="Grid of salon cards"]').get('div').contains('Humans Barber Shop');
  });

  it('Should filter salons by location', () => {
    cy.get('[data-test-id="Location select"]').click();
    cy.wait('@fetchCities');

    cy.get('[aria-labelledby="location-helper-label"]').get('li').contains('bydgoszcz').click();
    cy.wait('@fetchSalons');

    cy.get('[data-test-id="Grid of salon cards"] > div').should('have.length', 4);
  });

  it("Should display empty state if salon doesn't exist", () => {
    cy.get('[data-test-id="Search input"]').type('Noname salon').type('{enter}');

    cy.wait('@fetchSalons');
    cy.get('div').contains('There are no salons to show');
  });
});
