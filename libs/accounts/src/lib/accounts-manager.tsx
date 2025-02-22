import { t, useDataProvider } from '@vegaprotocol/react-helpers';
import { AsyncRenderer } from '@vegaprotocol/ui-toolkit';
import type { AgGridReact } from 'ag-grid-react';
import { useRef, useMemo, useCallback, memo } from 'react';
import type { AccountFields } from './accounts-data-provider';
import { aggregatedAccountsDataProvider } from './accounts-data-provider';
import type { GetRowsParams } from './accounts-table';
import { AccountTable } from './accounts-table';

interface AccountManagerProps {
  partyId: string;
  onClickAsset: (assetId: string) => void;
  onClickWithdraw?: (assetId?: string) => void;
  onClickDeposit?: (assetId?: string) => void;
}

export const AccountManager = ({
  onClickAsset,
  onClickWithdraw,
  onClickDeposit,
  partyId,
}: AccountManagerProps) => {
  const gridRef = useRef<AgGridReact | null>(null);
  const dataRef = useRef<AccountFields[] | null>(null);
  const variables = useMemo(() => ({ partyId }), [partyId]);
  const update = useCallback(
    ({ data }: { data: AccountFields[] | null }) => {
      const isEmpty = !dataRef.current?.length;
      dataRef.current = data;
      gridRef.current?.api?.refreshInfiniteCache();
      return Boolean((isEmpty && !data?.length) || (!isEmpty && data?.length));
    },
    [gridRef]
  );

  const { data, loading, error } = useDataProvider<AccountFields[], never>({
    dataProvider: aggregatedAccountsDataProvider,
    update,
    variables,
  });
  const getRows = useCallback(
    async ({ successCallback, startRow, endRow }: GetRowsParams) => {
      const rowsThisBlock = dataRef.current
        ? dataRef.current.slice(startRow, endRow)
        : [];
      const lastRow = dataRef.current?.length ?? undefined;
      successCallback(rowsThisBlock, lastRow);
    },
    []
  );
  return (
    <div className="relative h-full">
      <AccountTable
        rowModelType="infinite"
        ref={gridRef}
        datasource={{ getRows }}
        onClickAsset={onClickAsset}
        onClickDeposit={onClickDeposit}
        onClickWithdraw={onClickWithdraw}
      />
      <div className="pointer-events-none absolute inset-0 top-5">
        <AsyncRenderer
          data={data?.length ? data : null}
          error={error}
          loading={loading}
          noDataMessage={t('No accounts')}
        />
      </div>
    </div>
  );
};

export default memo(AccountManager);
