import { CompanyAccount, UserAccount } from '../users/account'

export interface RegisterNewUser {
  user: { password?: string } & UserAccount
  company: CompanyAccount
}
