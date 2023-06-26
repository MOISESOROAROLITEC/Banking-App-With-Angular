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
  oldPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
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
