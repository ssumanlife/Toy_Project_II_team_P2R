import { useState, useCallback } from 'react';

interface AggregateLoading {
  startLoading: () => void;
  finishLoading: () => void;
}

function useFetchWithLoading(aggregateLoading: AggregateLoading) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchWithLoading = useCallback(
    async (fetchFunction: () => Promise<any>) => {
      if (isLoading) return; // 이미 로딩 중인 경우 중복 호출 방지
      setIsLoading(true);
      aggregateLoading.startLoading();
      try {
        const result = await fetchFunction();
        return result;
      } finally {
        console.log('Finish loading');
        aggregateLoading.finishLoading();
        setIsLoading(false);
      }
    },
    [aggregateLoading, isLoading],
  );

  return { fetchWithLoading, isLoading };
}

export default useFetchWithLoading;
