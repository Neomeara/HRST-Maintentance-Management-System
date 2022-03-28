import { Group, User } from "./user";

export interface MaintenanceList {
  maintenanceListId: number,
  applicationUserId?: string,
  title: string,
  groupId: number,
  listItems: ListItem[],
  creationDate: Date,
  lastEditDate: Date
}

export interface ListItem {
  listItemId: number,
  maintenanceListId: number,
  name: string,
  locationId: number,
  cost: number,
  costYear: Date,
  maintenanceScheduleId: number,
  comments: string,
  pictures: Picture[]
}

export interface Picture {
  PictureId: number,
  url:string
}

export interface Location {
  locationId: number,
  name: string
}

export interface MaintenanceSchedule {
  maintenanceScheduleId: number,
  maintenanceInterval: number,
  lastCompleted: Date,
  nextScheduledEventForcasted: Date,
  nextScheduledEventPlanned: Date,
  yearsToDelay: number
}


export function newList(group: Group, title: string, ApplicationUser: User) : MaintenanceList {
  let newList: MaintenanceList = {
    maintenanceListId: 1,
    applicationUserId: ApplicationUser.id,
    title: title,
    groupId: group.groupId,
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  }

  return newList;

}


export interface FullListItem {
  listItem: ListItem,
  location: Location,
  maintenanceSchedule: MaintenanceSchedule
}

export interface FullMaintenanceList {
  maintenanceList: MaintenanceList,
  applicationUser: User,
  group: Group,
}

