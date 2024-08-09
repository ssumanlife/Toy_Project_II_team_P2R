import { useState, useCallback } from 'react';

function useAggregateLoading() {
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);

  const startLoading = useCallback(() => {
    setLoadingStates((prev) => {
      if (prev.length === 0) {
        console.log('Starting first loading');
      }
      return [...prev, true];
    });
  }, []);

  const finishLoading = useCallback(() => {
    setLoadingStates((prev) => {
      if (prev.length > 0) {
        console.log('Finish loading');
        const newStates = [...prev];
        newStates.pop();
        if (newStates.length === 0) {
          console.log('All loading finished');
        }
        return newStates;
      }
      console.warn('Attempted to finish loading with empty state');
      return prev;
    });
  }, []);

  const isLoading = loadingStates.length > 0;

  console.log('Current loading states:', loadingStates, 'isLoading:', isLoading);

  return { isLoading, startLoading, finishLoading };
}

export default useAggregateLoading;
