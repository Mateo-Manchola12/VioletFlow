export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type SortDirection = 'asc' | 'desc'

export interface SortOption<TFields extends string> {
  field: TFields
  direction: SortDirection
}
