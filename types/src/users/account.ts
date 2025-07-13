import { Privilege } from '../auth/privilege'
import { ObjectId } from 'mongodb'

export interface UserAccountBase {
  first_name: string
  last_name: string
  email: string
  phone: string
}

export interface CreateUserAccount extends UserAccountBase {
  password: string
}

export interface UserAccount extends UserAccountBase {
  _id: ObjectId | string
  company: string // ID de la empresa
  role: Privilege
  password: string
}

export type PublicUserAccount = Omit<UserAccount, '_id' | 'password' | 'company' | 'role'>
export interface CompanyAccountBase {
  name: string
  site: string
  size: string
  country: string
  city: string
}

export interface CreateCompanyAccount extends CompanyAccountBase {}
export interface CompanyAccount extends CompanyAccountBase {
  _id: ObjectId | string
}
