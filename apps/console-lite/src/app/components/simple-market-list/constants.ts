import { t } from '@vegaprotocol/react-helpers';
import { themelite as theme } from '@vegaprotocol/tailwindcss-config';
import * as Schema from '@vegaprotocol/types';
import colors from 'tailwindcss/colors';
import type { Market } from '@vegaprotocol/market-list';
import { IS_MARKET_TRADABLE } from '../../constants';

export const STATES_FILTER = [
  { value: 'all', text: t('All') },
  { value: Schema.MarketState.STATE_ACTIVE, text: t('Active') },
  { value: Schema.MarketState.STATE_CANCELLED, text: t('Cancelled') },
  { value: Schema.MarketState.STATE_CLOSED, text: t('Closed') },
  { value: Schema.MarketState.STATE_PENDING, text: t('Pending') },
  { value: Schema.MarketState.STATE_PROPOSED, text: t('Proposed') },
  { value: Schema.MarketState.STATE_REJECTED, text: t('Rejected') },
  { value: Schema.MarketState.STATE_SETTLED, text: t('Settled') },
  { value: Schema.MarketState.STATE_SUSPENDED, text: t('Suspended') },
  {
    value: Schema.MarketState.STATE_TRADING_TERMINATED,
    text: t('TradingTerminated'),
  },
];

export const agGridLightVariables = `
  .ag-theme-balham {
    --ag-row-border-color: ${theme.colors.transparent};
    --ag-row-hover-color: ${theme.colors.transparent};
    --ag-border-color: ${theme.colors.transparent};
    --ag-font-size: 15px;
  }
  .ag-theme-balham .ag-header-cell{
    padding-left: 0;
    padding-right: 0;
  }
  .ag-theme-balham .ag-cell{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .ag-theme-balham .ag-cell.overflow-visible{
    overflow: visible;
  }
  .ag-theme-balham .ag-row-hover:not(.mobile) {
    --ag-row-border-color: ${colors.black};
  }
  .ag-theme-balham .ag-row-hover .icon-green-hover {
    fill: ${theme.colors.darkerGreen};
  }
  .ag-theme-balham [col-id="status"] .ag-header-cell-label,
  .ag-theme-balham [col-id="asset"] .ag-header-cell-label,
  .ag-theme-balham [col-id="change"] .ag-header-cell-label{
    justify-content: center;
  }
  .ag-theme-balham .ag-header-row .ag-header-cell:first-child,
  .ag-theme-balham .ag-row.mobile .ag-cell:first-child{
    padding-left: 0;
  }
  .ag-theme-balham .ag-ltr .ag-header-cell::after, .ag-theme-balham .ag-ltr .ag-header-group-cell::after {
    right: 0;
  }
  .ag-theme-balham .ag-header-cell::after{
    width: 0;
  }
  .ag-theme-balham .ag-header{
     border-bottom-width: 0;
     border-bottom: none;
  }
  .ag-theme-balham .ag-has-focus .ag-row.ag-row-focus{
    border: 1px solid #0091ea;
  }
  .ag-theme-balham .ag-has-focus .ag-row.ag-row-focus .ag-cell-focus {
    outline: none;
    border-width: 0;
  }
  .ag-theme-balham .ag-header-label-icon .ag-icon{
    font-family: unset;
    font-size: 20px;
    font-weight: 600;
    position: relative;
    height: 20px;
    line-height: 20px;
    -moz-osx-font-smoothing: unset;
  }
  .ag-theme-balham .ag-icon::before{
    display: inline-block;
    font-family: Arial;
    font-size: 20px;
    line-height: 20px;
    height: 20px;
    content: "⬥";
    background: linear-gradient(0deg, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.54) 49%, rgba(0,0,0,0) 49%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.54) 60%, rgba(0,0,0,0.54) 100%);
    background: -moz-linear-gradient(-90deg, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.54) 54%, rgba(0,0,0,0) 54%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.54) 66%, rgba(0,0,0,0.54) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .ag-theme-balham .ag-icon-desc::before{
    background: linear-gradient(0deg, #000 0%, #000 49%, rgba(0,0,0,0) 49%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.54) 60%, rgba(0,0,0,0.54) 100%);
    background: -moz-linear-gradient(-90deg, #000 0%, #000 54%, rgba(0,0,0,0) 54%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.54) 66%, rgba(0,0,0,0.54) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .ag-theme-balham .ag-icon-asc::before{
    background: linear-gradient(0deg, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.54) 49%, rgba(0,0,0,0) 49%, rgba(0,0,0,0) 60%, #000 60%, #000 100%);
    background: -moz-linear-gradient(-90deg, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.54) 54%, rgba(0,0,0,0) 54%, rgba(0,0,0,0) 66%, #000 66%, #000 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const agGridDarkVariables = `
  .ag-theme-balham-dark {
    --ag-background-color: ${theme.colors.transparent};
    --ag-row-border-color: ${theme.colors.transparent};
    --ag-row-hover-color: ${theme.colors.transparent};
    --ag-odd-row-background-color: ${theme.colors.transparent};
    --ag-header-background-color: ${theme.colors.transparent};
    --ag-font-size: 15px;
  }
  .ag-theme-balham-dark .ag-header-cell{
    padding-left: 0;
    padding-right: 0;
  }
  .ag-theme-balham-dark .ag-cell{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .ag-theme-balham-dark .ag-cell.overflow-visible{
    overflow: visible;
  }
  .ag-theme-balham-dark .ag-row-hover:not(.mobile){
    --ag-row-border-color: ${colors.white};
  }
  .ag-theme-balham-dark .ag-row-hover .icon-green-hover {
    fill: ${theme.colors.lightGreen};
  }
  .ag-theme-balham-dark [col-id="status"] .ag-header-cell-label,
  .ag-theme-balham-dark [col-id="asset"] .ag-header-cell-label,
  .ag-theme-balham-dark [col-id="change"] .ag-header-cell-label{
    justify-content: center;
  }
  .ag-theme-balham-dark .ag-header-row .ag-header-cell:first-child,
  .ag-theme-balham-dark .ag-row.mobile .ag-cell:first-child{
    padding-left: 0;
  }
  .ag-theme-balham-dark .ag-header-row .ag-header-cell:first-child{
    padding-left: 0;
  }
  .ag-theme-balham-dark .ag-header-cell::after{
    width: 0;
  }
  .ag-theme-balham-dark .ag-header{
     border-bottom-width: 0;
     border-bottom: none;
  }
  .ag-theme-balham-dark .ag-has-focus .ag-row.ag-row-focus{
    border: 1px solid #0091ea;
  }
  .ag-theme-balham-dark .ag-has-focus .ag-row.ag-row-focus .ag-cell-focus {
    outline: none;
    border-width: 0;
  }
  .ag-theme-balham-dark .ag-header-label-icon .ag-icon{
    font-family: unset;
    font-size: 20px;
    font-weight: 600;
    position: relative;
    height: 20px;
    line-height: 20px;
    -moz-osx-font-smoothing: unset;
  }
  .ag-theme-balham-dark .ag-icon::before{
    display: inline-block;
    font-family: Arial;
    font-size: 20px;
    line-height: 20px;
    height: 20px;
    content: "⬥";
    background: linear-gradient(0deg, rgba(245, 245, 245, 0.64) 0%, rgba(245, 245, 245, 0.64) 49%, rgba(0,0,0,0) 49%, rgba(0,0,0,0) 60%, rgba(245, 245, 245, 0.64) 60%, rgba(245, 245, 245, 0.64) 100%);
    background: -moz-linear-gradient(-90deg, rgba(245, 245, 245, 0.64) 0%, rgba(245, 245, 245, 0.64) 54%, rgba(0,0,0,0) 54%, rgba(0,0,0,0) 66%, rgba(245, 245, 245, 0.64) 66%, rgba(245, 245, 245, 0.64) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-font-smoothing: antialiased;
  }
  .ag-theme-balham-dark .ag-icon-desc::before{
    background: linear-gradient(0deg, #fff 0%, #fff 49%, rgba(0,0,0,0) 49%, rgba(0,0,0,0) 60%, rgba(245, 245, 245, 0.64) 60%, rgba(245, 245, 245, 0.64) 100%);
    background: -moz-linear-gradient(-90deg, #fff 0%, #fff 54%, rgba(0,0,0,0) 54%, rgba(0,0,0,0) 66%, rgba(245, 245, 245, 0.64) 66%, rgba(245, 245, 245, 0.64) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .ag-theme-balham-dark .ag-icon-asc::before{
    background: linear-gradient(0deg, rgba(245, 245, 245, 0.64) 0%, rgba(245, 245, 245, 0.64) 49%, rgba(0,0,0,0) 49%, rgba(0,0,0,0) 60%, #fff 60%, #fff 100%);
    background: -moz-linear-gradient(-90deg, rgba(245, 245, 245, 0.64) 0%, rgba(245, 245, 245, 0.64) 54%, rgba(0,0,0,0) 54%, rgba(0,0,0,0) 66%, #fff 66%, #fff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const ROW_CLASS_RULES = {
  'cursor-pointer': ({ data }: { data: Market }) =>
    IS_MARKET_TRADABLE(data || {}),
};

export const LARGE_SCREENS = ['xl', 'xxl'];

export const ALL_PRODUCTS_ITEM = {
  name: t('All Markets'),
  id: 'allmarkets',
  cssClass: 'text-pink',
  color: theme.colors.pink,
};

export const AG_GRID_CONTAINER_STYLES = { width: '100%', height: '100%' };
