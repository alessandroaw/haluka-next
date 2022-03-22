import { getBoothBillsById } from "src/repositories/booths";
import useSWR from "swr";

export const boothBillsKey = (boothId: string) => [
  `/booths/${boothId}/bills`,
  boothId,
];
export const useBoothBills = (id: string) => {
  const { data, error, mutate } = useSWR(
    [`/booths/${id}/bills`, id],
    (url, id) => getBoothBillsById(id)
  );

  const loading = !data && !error;

  return {
    bills: data,
    loading,
    error,
    mutate,
  };
};
