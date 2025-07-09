import { Privilege } from "../auth/privilege"
import { ObjectId } from 'mongodb'

export interface UserAccount {
  id?: ObjectId | string // MongoDB ObjectId or string
  first_name: string
  last_name: string
  email: string
  phone: string
  company?: string // Company ID
  role?: Privilege
}

export interface CompanyAccount {
  id?: ObjectId | string // MongoDB ObjectId or string
  name: string
  site: string
  size: string
  country: string
  city: string
}
