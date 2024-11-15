export declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      birth_date: Date;
      created_at: string;
    };
    transactions: {
      id: string;
      title: string;
      type: "credit" | "debit";
      amount: number;
      created_at: string;
      session_id?: string;
    }
  }
}
