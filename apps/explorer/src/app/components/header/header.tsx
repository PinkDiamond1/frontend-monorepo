import { Search } from '../search';

export const Header = () => {
  return (
    <header className="flex px-16 pt-16 pb-8">
      <h1 className="text-h3" data-testid="explorer-header">
        Vega Explorer
      </h1>
      <Search />
    </header>
  );
};
