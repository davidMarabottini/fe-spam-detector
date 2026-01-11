import type { AvailableGendersType, AvailableRolesType, AvailableStatusesType } from "@/types/contentsFormDatas.types";

export type UserProfile = string;

export interface AuthContextType {
  user?: string;
  id?: number;
  role?: AvailableRolesType[]
  isAuthenticated?: boolean;
  isLoading: boolean;
}

export type decodedToken = {
  user: string;
  role: AvailableRolesType;
  created: string;
  exp: number;
  iat: number
}

export type UserDetails = {
  email: string
  gender: AvailableGendersType
  id: number
  name: string
  roles: AvailableRolesType[]
  surname: string
  username: string
}

export type UpdateResponse = {
  status: AvailableStatusesType
  user: UserDetails
}
