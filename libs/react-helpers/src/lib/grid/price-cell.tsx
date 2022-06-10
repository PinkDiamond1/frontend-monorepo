import React from 'react';
import { getDecimalSeparator } from '../format';
export interface IPriceCellProps {
  value: number | bigint | null | undefined;
  valueFormatted: string;
  testId?: string;
}

export const PriceCell = React.memo(
  ({ value, valueFormatted, testId }: IPriceCellProps) => {
    if (
      (!value && value !== 0) ||
      (typeof value === 'number' && isNaN(Number(value)))
    ) {
      return <span data-testid="price">-</span>;
    }
    const decimalSeparator = getDecimalSeparator();
    const valueSplit = decimalSeparator
      ? valueFormatted.split(decimalSeparator)
      : [value];
    return (
      <span
        className="font-mono relative text-ui-small"
        data-testid={testId || 'price'}
      >
        {valueSplit[0]}
        {valueSplit[1] ? decimalSeparator : null}
        {valueSplit[1] ? (
          <span className="text-black-muted dark:text-white-muted">
            {valueSplit[1]}
          </span>
        ) : null}
      </span>
    );
  }
);

PriceCell.displayName = 'PriceCell';
