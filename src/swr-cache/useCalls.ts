import { fetchCall } from "src/repositories/calls";
import { CallFilterParams } from "src/types/params";
import useSWR from "swr";

export const useCalls = (query: CallFilterParams) => {
  const { data, error, mutate } = useSWR(
    ["/calls", query],
    (url, query) => fetchCall(query),
    {
      refreshInterval: 1000,
    }
  );

  const loading = !data && !error;

  return {
    calls: data,
    loading,
    error,
    mutate,
  };
};
