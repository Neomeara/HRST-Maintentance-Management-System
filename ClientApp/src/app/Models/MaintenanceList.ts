//import { User } from "oidc-client";
import { DefaultUser } from "../todo-list-page/mockLists";
import { User } from "./user";

export interface MaintenanceList {
  maintenanceListId: number,
  applicationUser: User,
  applicationUserId: string,
  title: string,
  group: string,
  listItems: ListItem[],
  creationDate: Date,
  lastEditDate: Date
}

export interface ListItem {
  listItemId: number,
  maintenanceList: MaintenanceList,
  maintenanceListId: number,
  name: string,
  location: Location,
  cost: number,
  costYear: Date,
  maintenanceSchedule: MaintenanceSchedule,
  comments: string,
  pictures: Picture[]
}

export interface Picture {
  PictureId: number,
  ListItem: ListItem,
  ListItemId: number,
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


export function newList(group: string, title: string, ApplicationUser: User) : MaintenanceList {
  let newList: MaintenanceList = {
    maintenanceListId: 1,
    applicationUser: ApplicationUser,
    applicationUserId: ApplicationUser.id,
    title: title,
    group: group,
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  }

  return newList;

}
