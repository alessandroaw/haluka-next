import create from "zustand";

interface BoothFocusState {
  selectedBoothId: string;
  setSelectedBooth: (boothId: string) => void;
  clearSelectedBooth: () => void;
}

// Create useMonitoringStore using zustand create
export const useBoothFocus = create<BoothFocusState>((set) => ({
  selectedBoothId: "",
  setSelectedBooth: (boothId: string) =>
    set((state) => ({ ...state, selectedBoothId: boothId })),
  clearSelectedBooth: () => set((state) => ({ ...state, selectedBoothId: "" })),
}));
