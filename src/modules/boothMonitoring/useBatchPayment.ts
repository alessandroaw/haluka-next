import { Bill } from "src/types/models";
import create from "zustand";

interface BatchPaymentState {
  selectedBoothId: string;
  setSelectedBooth: (boothId: string) => void;
  billBatch: Bill[];
  batchBoothId: string;
  addBillToBatch: (bill: Bill) => void;
  removeBillFromBatch: (bill: Bill) => void;
  clearBatch: () => void;
}

// Create useMonitoringStore using zustand create
export const useBatchPayment = create<BatchPaymentState>((set, get) => ({
  selectedBoothId: "",
  setSelectedBooth: (boothId: string) =>
    set((state) => ({ ...state, selectedBoothId: boothId })),
  billBatch: [],
  batchBoothId: "",
  // addBillToBatch when bill.boothId is equal to batchBoothId
  // otherwise clear the billBatch first
  addBillToBatch: (bill: Bill) => {
    const { batchBoothId } = get();
    if (bill.boothId === batchBoothId) {
      set((state) => ({ ...state, billBatch: [...state.billBatch, bill] }));
    } else {
      set((state) => ({
        ...state,
        billBatch: [bill],
        batchBoothId: bill.boothId,
        selectedBoothId: bill.boothId,
      }));
    }
  },
  // removeBillFromBatch when bill.boothId is equal to batchBoothId
  // otherwise do nothing
  removeBillFromBatch: (bill: Bill) => {
    const { batchBoothId, billBatch } = get();
    if (bill.boothId === batchBoothId) {
      const billIndex = billBatch.findIndex((b) => b.id === bill.id);
      if (billIndex > -1) {
        set((state) => ({
          ...state,
          batchBoothId: billBatch.length === 1 ? "" : billBatch[0].boothId,
          selectedBoothId: billBatch.length === 1 ? "" : billBatch[0].boothId,
          billBatch: [
            ...billBatch.slice(0, billIndex),
            ...billBatch.slice(billIndex + 1),
          ],
        }));
      }
    }
  },
  // clearBatch reset batchBoothId and billBatch
  clearBatch: () =>
    set((state) => ({ ...state, batchBoothId: "", billBatch: [] })),
}));

export const isBillInBatch = (
  bill: Bill,
  batchBoothId: string,
  billBatch: Bill[]
) => {
  return (
    bill.boothId === batchBoothId &&
    billBatch.findIndex((b) => b.id === bill.id) !== -1
  );
};
