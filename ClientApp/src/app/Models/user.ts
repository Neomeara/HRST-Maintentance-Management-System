import { MaintenanceList } from "./MaintenanceList";

export interface User {
  accessFailedCount?: number
  concurrencyStamp?: string
  email: string
  emailConfirmed?: boolean
  firstname: string
  group: Group
  id: string
  lastname: string
  lockoutEnabled?: boolean
  lockoutEnd?: Date
  maintenanceLists: MaintenanceList[]
  normalizedEmail?: string
  normalizedUserName?: string
  passwordHash?: string
  phoneNumber?: string
  phoneNumberConfirmed?: boolean
  securityStamp?: string
  twoFactorEnabled?: boolean
  userName: string
}
export interface Group {
  groupId: number;
  name: string;
  domain: string;
}
