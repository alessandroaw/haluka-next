import create from "zustand";

interface BoothFocusState {
  selectedBoothId: string;
  setSelectedBooth: (boothId: string) => void;
}

// Create useMonitoringStore using zustand create
const useBoothFocus = create<BoothFocusState>((set) => ({
  selectedBoothId: "",
  setSelectedBooth: (boothId: string) =>
    set((state) => ({ ...state, selectedBoothId: boothId })),
}));
