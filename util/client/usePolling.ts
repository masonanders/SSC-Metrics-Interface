import { useEffect, useState } from 'react';

export default function usePolling<RowType>(
  requestUrl: string,
  pollingInterval = 5000
): { rows: RowType[] } {
  const [data, setData] = useState({ rows: [] });

  useEffect(() => {
    async function getData() {
      if (document.visibilityState === 'visible') {
        const response = await fetch(requestUrl);
        setData(await response.json());
      }
    }
    getData();

    let pollInstance = poll();
    function poll() {
      return window.setTimeout(async () => {
        await getData();
        pollInstance = poll();
      }, pollingInterval);
    }

    function cancelPoll() {
      window.clearTimeout(pollInstance);
    }

    return cancelPoll;
  }, []);

  return data;
}
