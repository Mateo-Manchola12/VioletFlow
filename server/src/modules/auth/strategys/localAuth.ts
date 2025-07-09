import { UserAccount, CompanyAccount } from "@violetflow/types";
import { registerCompany, registerUser } from "../auth.service";

export async function localSignUp(
  user: UserAccount,
  company: CompanyAccount,
): Promise<{ userId: string; companyId: string }> {
  const companyId = await registerCompany(company)
  user.company = companyId
  const userId = await registerUser(user)

  return { userId, companyId }
}

export function localSignIn(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // Simulate a successful signin
    const user = { id: 1, ...data }
    resolve(user)
  })
}
