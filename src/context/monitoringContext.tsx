import React from "react";
export const useMonitoring = () => {
  const [selectedBoothId, setSelectedBoothId] = React.useState("");

  const setSelectedBooth = (boothId: string) => {
    setSelectedBoothId(boothId);
  };

  const clearSelectedBooth = () => {
    setSelectedBoothId("");
  };

  return {
    selectedBoothId,
    setSelectedBooth,
    clearSelectedBooth,
  };
};

type MonitoringContextType = ReturnType<typeof useMonitoring>;
const monitoringContext = React.createContext<
  MonitoringContextType | undefined
>(undefined);

export const useMonitoringContext = () => {
  const context = React.useContext(monitoringContext);
  if (context === undefined) {
    throw new Error(
      "useMonitoringContext must be used within a MonitoringProvider"
    );
  }
  return context;
};

export const MonitoringProvider: React.FC = ({ children }) => {
  const { selectedBoothId, setSelectedBooth, clearSelectedBooth } =
    useMonitoring();

  // Use react memo to avoid re-rendering the context provider
  // when the selectedBoothId is not changed
  const value = React.useMemo(
    () => ({
      selectedBoothId,
      setSelectedBooth,
      clearSelectedBooth,
    }),
    [selectedBoothId]
  );

  return (
    <monitoringContext.Provider value={value}>
      {children}
    </monitoringContext.Provider>
  );
};
