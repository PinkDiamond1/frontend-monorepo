import React from 'react';
import type { ReactNode } from 'react';
import { TruncateInline } from '../truncate/truncate';
import { CopyWithTooltip, Icon } from '@vegaprotocol/ui-toolkit';

interface PageHeaderProps {
  title: string;
  truncateStart?: number;
  truncateEnd?: number;
  copy?: boolean;
  prefix?: string | ReactNode;
  className?: string;
}

export const PageHeader = ({
  prefix,
  title,
  truncateStart,
  truncateEnd,
  copy = false,
  className,
}: PageHeaderProps) => {
  const titleClasses = 'text-4xl xl:text-5xl uppercase font-alpha';
  return (
    <header className={className}>
      <span className={`${titleClasses} block`}>{prefix}</span>
      <div className="flex items-center gap-x-4">
        <h2 className={titleClasses}>
          {truncateStart && truncateEnd ? (
            <TruncateInline
              text={title}
              startChars={truncateStart}
              endChars={truncateEnd}
            />
          ) : (
            title
          )}
        </h2>
        {copy && (
          <CopyWithTooltip data-testid="copy-to-clipboard" text={title}>
            <button className="bg-zinc-100 dark:bg-zinc-900 rounded-sm py-2 px-3">
              <Icon name="duplicate" className="" />
            </button>
          </CopyWithTooltip>
        )}
      </div>
    </header>
  );
};
