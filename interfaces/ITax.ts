export interface ITaxTypes {
  id: number;
  name: string;
  created_at: string;
  isDeleted: boolean;
}

export interface ITax {
  id: number;
  name: string;
  created_at?: string;
  isDeleted?: boolean;
  amount: number;
  date: string;
}
