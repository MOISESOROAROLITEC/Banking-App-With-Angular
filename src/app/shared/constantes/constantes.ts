export const baseUrl = "http://localhost:5432"

export interface UserDatasSignUp {
  name: string,
  email: string,
  password: string,
}
export interface UserDatasLogin {
  email: string,
  password: string
}
export interface UserDatas {
  name: string
  email: string
  password?: string
  role: string
  token?: string
}

export interface UpdateUserDatas {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined
}

export interface UserDatasState extends UserDatas {
  loading: boolean
}

export interface UserDatasStore {
  name: string
  password?: string
  email: string
  role: string
  token?: string
  loading?: boolean
  requestErrorMessage?: string
}

export interface Account {
  iban: string;
  balance: number;
  currency: string;
  bic: string;
  type: string;
  createAt?: string;
  updateAt?: string,
  userId?: string
}

export interface SubAccount extends Account {

  accountParentIban: string
}

export interface UserAccounts {
  account: Account,
  subAccount: Array<SubAccount>,
}

export interface UserAllAccounts {
}

export interface UserAccountsState {
  account?: Account,
  subAccount?: Array<SubAccount>,
  errorMessage?: string,
  loading?: boolean
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
