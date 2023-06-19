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
  password?: string
  email: string
  token?: string
}
export interface UserDatasStore {
  name: string
  password?: string
  email: string
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

export interface SubAccount extends Omit<Account, 'userId'> {
  accountParentIban: string
}

export interface UserAccounts {
  account: Account,
  subAccount: Array<SubAccount>,
}

export interface UserAccountsState {
  account?: Account,
  subAccount?: Array<SubAccount>,
  errorMessage?: string,
  loading?: boolean
}


