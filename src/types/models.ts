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

export type Bill = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  boothId: string;
  userId: string;
  status: number;
  total: number;
  endedAt: Date;
  paidAt: null;
  calls: Call[];
};

export type Call = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  billId: string;
  callNumber: string;
  duration: number | null;
  total: number | null;
  method: number;
  status: number;
  paidAt: null;
  endedAt: Date | null;
};
