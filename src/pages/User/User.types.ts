import type { AvailableGendersType } from "@/types/contentsFormDatas.types"

export type UserForm = {
  name: string
  surname: string
  // birthday?: string
  gender: AvailableGendersType
  username: string
  email: string
}