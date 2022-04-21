import { getBoothsByUserId, getUserBooths } from "src/repositories/booths";
import useSWR from "swr";

export const userBoothsByIdKeys = (userId?: string) =>
  userId ? [`users/${userId}/booths`, userId] : `/users/booths`;

export const useUserBoothsById = (userId?: string) => {
  const { data, error, mutate } = useSWR(
    [`users/${userId}/booths`, userId],
    (url, wartelId) =>
      wartelId ? getBoothsByUserId(wartelId) : getUserBooths()
  );

  const loading = !data && !error;

  return {
    booths: data,
    loading,
    error,
    mutate,
  };
};
