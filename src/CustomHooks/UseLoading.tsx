import { useState, useCallback } from 'react';

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, showLoading, hideLoading };
}

export default useLoading;
