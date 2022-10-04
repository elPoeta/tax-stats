export interface ITaxTypes {
  id: number;
  name: string;
  created_at: string;
  is_deleted: boolean;
}

export interface ITax {
  id: number;
  name: string;
  created_at?: string;
  is_deleted?: boolean;
  amount: number;
  date: string;
}
