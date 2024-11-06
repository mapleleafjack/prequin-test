
export interface Investor {
    id: number;
    name: string;
    type: string;
    country: string;
    date_added: string;
    last_updated: string;
    total_commitments: number;
    commitments?: Commitment[];
  }
  
  export interface Commitment {
    id: number;
    investor_id: number;
    asset_class: string;
    amount: number;
    currency: string;
  }
  
  export type RequiredInvestorKeys = Exclude<
    {
      [K in keyof Investor]: Investor[K] extends Required<Investor>[K] ? K : never;
    }[keyof Investor],
    undefined
  >;