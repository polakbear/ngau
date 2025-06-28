import { useRef, useEffect } from 'react';

/**
 * Memoizes a callback and updates it when dependencies change.
 * Returns a stable function reference.
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const stableRef = useRef(
    (...args: Parameters<T>): ReturnType<T> => ref.current(...args)
  );

  return stableRef.current as T;
}
