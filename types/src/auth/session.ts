import { Privilege } from './privilege'
import { ObjectId } from 'mongodb'

export interface Session {
  userId: string | ObjectId
  companyId: string | ObjectId
  role: Privilege
}