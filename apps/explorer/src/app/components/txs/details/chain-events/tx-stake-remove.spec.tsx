import { render } from '@testing-library/react';
import { t } from '@vegaprotocol/react-helpers';

import type { components } from '../../../../../types/explorer';
import omit from 'lodash/omit';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { TxDetailsChainEventStakeRemove } from './tx-stake-remove';

type Remove = components['schemas']['vegaStakeRemoved'];

const fullMock: Remove = {
  amount: 'amount123',
  blockTime: 'block123',
  ethereumAddress: 'eth123',
  vegaPublicKey: 'vega123',
};

describe('Chain Event: Stake remove', () => {
  it('Renders nothing if no good data is provided', () => {
    const mock = undefined as unknown as Remove;
    const screen = render(<TxDetailsChainEventStakeRemove remove={mock} />);

    expect(screen.container).toBeEmptyDOMElement();
  });

  it('Renders nothing if correct type with no data is provided', () => {
    const mock: Remove = {};

    const screen = render(<TxDetailsChainEventStakeRemove remove={mock} />);
    expect(screen.container).toBeEmptyDOMElement();
  });

  it(`Renders nothing if correct type with partial data is provided`, () => {
    for (const key in fullMock) {
      const mock = omit(fullMock, key);
      const screen = render(<TxDetailsChainEventStakeRemove remove={mock} />);
      expect(screen.container).toBeEmptyDOMElement();
    }
  });

  it('Renders TableRows if all data is provided', () => {
    const screen = render(
      <MockedProvider>
        <MemoryRouter>
          <table>
            <tbody>
              <TxDetailsChainEventStakeRemove remove={fullMock} />
            </tbody>
          </table>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText(t('Chain event type'))).toBeInTheDocument();
    expect(screen.getByText(t('Stake remove'))).toBeInTheDocument();

    expect(screen.getByText(t('Amount'))).toBeInTheDocument();
    expect(screen.getByText(`${fullMock.amount}`)).toBeInTheDocument();

    expect(screen.getByText(t('Removed at'))).toBeInTheDocument();
    expect(screen.getByText(`${fullMock.blockTime}`)).toBeInTheDocument();

    expect(screen.getByText(t('Recipient'))).toBeInTheDocument();
    const partyLink = screen.getByText(`${fullMock.vegaPublicKey}`);
    expect(partyLink).toBeInTheDocument();
    expect(partyLink.tagName).toEqual('A');
    expect(partyLink.getAttribute('href')).toEqual(
      `/parties/${fullMock.vegaPublicKey}`
    );

    expect(screen.getByText(t('Source'))).toBeInTheDocument();
    const ethLink = screen.getByText(`${fullMock.ethereumAddress}`);
    expect(ethLink.getAttribute('href')).toContain(
      `/address/${fullMock.ethereumAddress}`
    );
  });
});
