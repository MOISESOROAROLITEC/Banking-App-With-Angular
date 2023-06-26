export interface TransactionsFilter {
  status: string | undefined;
  typeOfAccount: string | undefined;
  transactionDate: string | number | undefined;
  reciverNameOrAmount: string | number | undefined;
  currentPage: number;
  pageSize: number;
}


export interface Transaction {
  id?: number,
  amount?: number,
  transactionType?: string,
  accountReciver?: string,
  createAt?: string,
  updateAt?: string,
  accountEmmiterIban?: string
  subAccountIban?: string,
}

export interface UserTransactions {
  transactions?: Transaction[],
}

export interface UserTransactionsReducer extends UserTransactions {
  transactions?: Transaction[];
  loading: boolean;
  requestErrorMessage?: string;
}

export interface DoTransfert {
  transactionType: string;
  accountEmmiterIban: string;
  accountReciver: string;
  amount: number
}

export interface TransfertState {
  transactionState: boolean | undefined;
  errorMessage: string
}

export interface AdminTransactions extends Transaction {
  reciver: string
}

export interface AllTransactions {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  transactions: Array<AdminTransactions>;
}

export interface AllTransactionsState extends AllTransactions {
  loading: boolean
}
