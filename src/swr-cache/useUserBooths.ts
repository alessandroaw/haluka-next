import { getUserBooths } from "src/repositories/booths";
import useSWR from "swr";

export const useUserBooths = () => {
  const { data, error, mutate } = useSWR("/user/booths", getUserBooths);

  const loading = !data && !error;

  return {
    booths: data,
    loading,
    error,
    mutate,
  };
};
