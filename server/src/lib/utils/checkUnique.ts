import { $ } from '../../config/db'

export async function checkUnique(
  params: { name: string; value: string } | { name: string; value: string }[],
  collection: string,
  strict: boolean = true,
): Promise<boolean> {
  const query = !Array.isArray(params)
    ? { [params.name]: params.value }
    : strict
      ? { $or: params.map((param) => ({ [param.name]: param.value })) }
      : { $and: params.map((param) => ({ [param.name]: param.value })) }
  const count = await $.collection(collection).countDocuments(query)
  return count === 0
}
