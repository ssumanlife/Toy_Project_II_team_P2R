import { useState, useEffect } from 'react';

function useLoading({ loading, minimumLoadTime = 0 }: { loading: boolean; minimumLoadTime?: number }) {
  const [displayLoading, setDisplayLoading] = useState(true);

  useEffect(() => {
    let timer: number | null = null;

    if (loading) {
      setDisplayLoading(true);
    } else {
      timer = window.setTimeout(() => {
        setDisplayLoading(false);
      }, minimumLoadTime);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [loading, minimumLoadTime]);

  return displayLoading;
}

export default useLoading;
