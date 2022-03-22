import create from "zustand";

interface MonitoringState {
  selectedBoothId: string;
  setSelectedBooth: (boothId: string) => void;
  clearSelectedBooth: () => void;
}

// Create useMonitoringStore using zustand create
export const useMonitoringStore = create<MonitoringState>((set) => ({
  selectedBoothId: "",
  setSelectedBooth: (boothId: string) =>
    set((state) => ({ ...state, selectedBoothId: boothId })),
  clearSelectedBooth: () => set((state) => ({ ...state, selectedBoothId: "" })),
}));
