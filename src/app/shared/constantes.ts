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
