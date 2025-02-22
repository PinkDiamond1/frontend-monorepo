import orderBy from 'lodash/orderBy';
import type { UpdateQueryFn } from '@apollo/client/core/watchQueryOptions';
import { useVegaWallet } from '@vegaprotocol/wallet';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useMemo } from 'react';
import {
  useWithdrawalsQuery,
  WithdrawalEventDocument,
} from './__generated__/Withdrawal';
import type {
  WithdrawalsQuery,
  WithdrawalFieldsFragment,
  WithdrawalEventSubscription,
  WithdrawalEventSubscriptionVariables,
} from './__generated__/Withdrawal';
import { removePaginationWrapper } from '@vegaprotocol/react-helpers';

type WithdrawalEdges = { node: WithdrawalFieldsFragment }[];

export const useWithdrawals = () => {
  const { pubKey } = useVegaWallet();
  const { data, loading, error, subscribeToMore } = useWithdrawalsQuery({
    variables: { partyId: pubKey || '' },
    skip: !pubKey,
  });

  useEffect(() => {
    if (!pubKey) return;

    const unsub = subscribeToMore<
      WithdrawalEventSubscription,
      WithdrawalEventSubscriptionVariables
    >({
      document: WithdrawalEventDocument,
      variables: { partyId: pubKey },
      updateQuery,
    });

    return () => {
      unsub();
    };
  }, [pubKey, subscribeToMore]);

  const withdrawals = useMemo(() => {
    if (!data?.party?.withdrawalsConnection?.edges) {
      return [];
    }

    return orderBy(
      removePaginationWrapper(data.party.withdrawalsConnection.edges),
      'createdTimestamp',
      'desc'
    );
  }, [data]);

  /**
   * withdrawals that have to be completed by a user.
   */
  const pending = useMemo(() => {
    return withdrawals.filter((w) => !w.txHash);
  }, [withdrawals]);

  /**
   * withdrawals that are completed or being completed
   */
  const completed = useMemo(() => {
    return withdrawals
      .filter((w) => w.txHash)
      .sort((a, b) =>
        (b.withdrawnTimestamp || b.createdTimestamp).localeCompare(
          a.withdrawnTimestamp || a.createdTimestamp
        )
      );
  }, [withdrawals]);

  return {
    data,
    loading,
    error,
    withdrawals,
    pending,
    completed,
  };
};

export const updateQuery: UpdateQueryFn<
  WithdrawalsQuery,
  WithdrawalEventSubscriptionVariables,
  WithdrawalEventSubscription
> = (prev, { subscriptionData, variables }) => {
  if (!subscriptionData.data.busEvents?.length) {
    return prev;
  }

  const curr = prev.party?.withdrawalsConnection?.edges || [];
  const incoming = subscriptionData.data.busEvents.reduce<WithdrawalEdges>(
    (acc, event) => {
      if (event.event.__typename === 'Withdrawal') {
        acc.push({
          node: {
            ...event.event,
            pendingOnForeignChain: false,
          },
        });
      }
      return acc;
    },
    []
  );

  const edges = uniqBy([...incoming, ...curr], 'node.id');

  // Write new party to cache if not present
  if (!prev.party) {
    return {
      ...prev,
      party: {
        id: variables?.partyId,
        __typename: 'Party',
        withdrawalsConnection: {
          __typename: 'WithdrawalsConnection',
          edges,
        },
      },
    } as WithdrawalsQuery;
  }

  return {
    ...prev,
    party: {
      ...prev.party,
      withdrawalsConnection: {
        __typename: 'WithdrawalsConnection',
        edges,
      },
    },
  };
};
