export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  clientId: string;
  name: string;
  role: number;
};

export type Booth = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  activeSession: null | string;
  userId: string;
  boothNumber: number;
  lastBillNumber: null;
};
