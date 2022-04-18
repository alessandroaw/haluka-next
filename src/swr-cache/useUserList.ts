import useSWR from "swr";
import { fetchUserList, getUserProfile } from "src/repositories/auth";

export const userListKey = "/users";

export const useUserList = () => {
  const { data, error, mutate } = useSWR("/users", fetchUserList);

  const loading = !data && !error;

  return {
    users: data,
    loading,
    error,
    mutate,
  };
};
