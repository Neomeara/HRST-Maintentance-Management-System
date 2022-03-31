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
  location: string,
  priority: string,
  totalCost: number,
  costPerYear: number,
  maintenanceInterval: number,
  maintenanceIntervalType: string,
  lastCompleted: Date,
  nextScheduledEvent: Date,
  comments: string,
  pictures: Picture[]
}

export interface Picture {
  PictureId: number,
  url:string
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

