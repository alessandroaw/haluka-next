import { fetchCall } from "src/repositories/calls";
import { CallFilterQuery } from "src/types/query";
import useSWR from "swr";

export const useCalls = (query: CallFilterQuery) => {
  const { data, error, mutate } = useSWR(["/calls", query], (url, query) =>
    fetchCall(query)
  );

  const loading = !data && !error;

  return {
    calls: data,
    loading,
    error,
    mutate,
  };
};
