import { User } from "./user";

export interface MaintenanceList {
  maintenanceListId: number,
  applicationUser: User,
  group: string,
  listItems: ListItem[],
  creationDate: Date,
  lastEditDate: Date
}

export interface ListItem {
  listItemId: number,
  //MaintenanceList: MaintenanceList,
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
