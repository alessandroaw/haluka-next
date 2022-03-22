import { Bill } from "src/types/models";
import create from "zustand";

interface BatchPaymentState {
  billBatch: Bill[];
  batchBoothId: string;
  addBillToBatch: (bill: Bill) => void;
  removeBillFromBatch: (bill: Bill) => void;
}

// Create useMonitoringStore using zustand create
export const useBatchPayment = create<BatchPaymentState>((set, get) => ({
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
          billBatch: [
            ...billBatch.slice(0, billIndex),
            ...billBatch.slice(billIndex + 1),
          ],
        }));
      }
    }
  },
  // isBillInBatch check if bill is in billBatch by first checking whether the booth id is the same
  // then check if the bill id is the same
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
