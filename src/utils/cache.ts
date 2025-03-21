const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getFromCache = (url: string) => {
  const cache = localStorage.getItem(`pagespeed_${url}`);
  if (!cache) return null;

  const { timestamp, result } = JSON.parse(cache);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(`pagespeed_${url}`);
    return null;
  }

  return result;
};

export const saveToCache = (url: string, result: any) => {
  localStorage.setItem(
    `pagespeed_${url}`,
    JSON.stringify({
      timestamp: Date.now(),
      result,
    })
  );
};