import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer yourValidAccessToken'); // Убедитесь, что токен установлен
    localStorage.setItem('refreshToken', 'yourValidRefreshToken'); 
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/'); // Используем базовый URL
    cy.wait('@getUser');
    // cy.wait('@getIngredients'); // Ждем, пока ингредиенты загрузятся
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
    cy.wait('@getIngredients')
  });

  it('Тест открытия и закрытия модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().should('exist').click({ force: true });
    cy.get('[data-cy="modal"]').as('modal');
    
    cy.get('@modal').should('exist').should('be.visible'); // Проверка видимости модального окна
    cy.get('@modal').should('contain', 'Краторная булка N-200i');
  
    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('@modal').should('exist').should('be.visible'); // Повторная проверка видимости модального окна
  
    cy.get('[data-cy="modal-overlay"]').click('left', { force: true });
    cy.get('@modal').should('not.exist');
    cy.wait('@getIngredients'); // Ждем, пока ингредиенты загрузятся

  });

  it('Тест создания заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('orderBurgerApi');
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    // Используем force для клика по кнопке оформления заказа
    cy.get('@constructor').children('div').children('button').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '53712');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('@constructor').should('not.contain', 'Биокотлета из марсианской Магнолии');
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');

    cy.wait('@orderBurgerApi');
  });
});
