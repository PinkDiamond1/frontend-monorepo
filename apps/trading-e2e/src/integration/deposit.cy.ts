import { connectEthereumWallet } from '../support/ethereum-wallet';

const assetSelectField = 'select[name="asset"]';
const toAddressField = 'input[name="to"]';
const amountField = 'input[name="amount"]';
const formFieldError = 'input-error-text';

describe('deposit form validation', { tags: '@smoke' }, () => {
  before(() => {
    cy.mockWeb3Provider();
    cy.mockSubscription();
    cy.mockTradingPage();
    cy.setVegaWallet();
    cy.visit('/#/portfolio');
    cy.get('main[data-testid="/portfolio"]').should('exist');
    cy.getByTestId('Deposits').click();
    cy.getByTestId('deposit-button').click();
    cy.wait('@Assets');
    connectEthereumWallet();
    cy.getByTestId('deposit-submit').click();
  });

  it('handles empty fields', () => {
    cy.getByTestId(formFieldError).should('contain.text', 'Required');
    cy.getByTestId(formFieldError).should('have.length', 2);
  });

  it('unable to select assets not enabled', () => {
    // Assets not enabled in mocks
    cy.get(assetSelectField + ' option:contains(Asset 2)').should('not.exist');
    cy.get(assetSelectField + ' option:contains(Asset 3)').should('not.exist');
    cy.get(assetSelectField + ' option:contains(Asset 4)').should('not.exist');
  });

  it('invalid public key', () => {
    cy.get(toAddressField)
      .clear()
      .type('INVALID_DEPOSIT_TO_ADDRESS')
      .next(`[data-testid="${formFieldError}"]`)
      .should('have.text', 'Invalid Vega key');
  });

  it('invalid amount', () => {
    // Deposit amount smaller than minimum viable for selected asset
    // Select an amount so that we have a known decimal places value to work with
    cy.get(assetSelectField).select('Euro');
    cy.get(amountField)
      .clear()
      .type('0.00000000000000000000000000000000001')
      .next(`[data-testid="${formFieldError}"]`)
      .should('have.text', 'Value is below minimum');
  });

  it('insufficient funds', () => {
    // Deposit amount is valid, but less than approved. This will always be the case because our
    // CI wallet wont have approved any assets
    cy.get(amountField)
      .clear()
      .type('100')
      .next(`[data-testid="${formFieldError}"]`)
      .should('have.text', 'Insufficient amount in Ethereum wallet');
  });
});
