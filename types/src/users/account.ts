import { Privilege } from "../auth/privilege"

export interface UserAccount {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company?: string // Company ID
  role?: Privilege
}

export interface CompanyAccount {
  id?: string
  name: string
  site: string
  size: string
  country: string
  city: string
}
