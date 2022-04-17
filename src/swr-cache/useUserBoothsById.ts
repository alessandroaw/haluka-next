import { getBoothsByUserId, getUserBooths } from "src/repositories/booths";
import useSWR from "swr";

export const useUserBoothsById = (userId: string) => {
  const { data, error, mutate } = useSWR(
    [`users/${userId}/booths`, userId],
    (url, userId) => getBoothsByUserId(userId)
  );

  const loading = !data && !error;

  return {
    booths: data,
    loading,
    error,
    mutate,
  };
};
