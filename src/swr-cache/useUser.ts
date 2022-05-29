import useSWR from "swr";
import { getUserProfile } from "src/repositories/auth";

export const useUser = () => {
  const { data, error, mutate } = useSWR("/user/profile", getUserProfile);

  const loading = !data && !error;
  const loggedOut = error && error.status === 401;

  return {
    user: data,
    loading,
    loggedOut,
    error,
    mutate,
  };
};
