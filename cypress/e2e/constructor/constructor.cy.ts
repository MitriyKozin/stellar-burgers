import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    setCookie('accessToken');
    localStorage.setItem('refreshToken', 'testToken'); 
    cy.intercept('GET', `${URL}//auth/user`, {fixture: 'user.json'}).as('getUser');
    cy.intercept('GET', `${URL}/ingredients`, {fixture: 'ingredients.json'}).as('getIngredients');
    cy.visit('@api');
    cy.wait('@getUser');
  });
  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
  it('Тест получения списка ингредиентов с сервера', () => {
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
  });
  it('Тест открытия и закрытия модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('@modal').should('exist');

    cy.get('[data-cy="modal-overlay"]').click('left', {force: true});
    cy.get('@modal').should('not.exist');
  });
  it('Тест создания заказа', () => {
    cy.intercept('POST', `${URL}/orders`, {fixture: 'order.json'}).as('orderBurgerApi');
    cy.get('[data-cy="constructor"]').as('constructor');


    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').children('div').children('button').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '37865');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');


    cy.get('@constructor').should('not.contain', 'Биокотлета из марсианской Магнолии');
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');

    cy.wait('@orderBurgerApi');

  })
});

