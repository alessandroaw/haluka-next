import { getClientProfile } from "src/repositories/clients";
import useSWR from "swr";

export const useClient = () => {
  const { data, error, mutate } = useSWR("/clients/profile", getClientProfile);

  const loading = !data && !error;

  return {
    client: data,
    loading,
    error,
    mutate,
  };
};
