import React from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
