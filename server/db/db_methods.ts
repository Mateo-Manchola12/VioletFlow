import { Db } from 'mongodb'
import client from './db_connection.ts'

export async function query<T>(callback: (db: Db) => Promise<T>): Promise<T> {
  await client.connect()
  const db = client.db('violetflow')
  return await callback(db)
}
