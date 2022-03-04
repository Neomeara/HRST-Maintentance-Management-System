import { MaintenanceList, ListItem } from '../Models/MaintenanceList';
import { Group, User } from '../Models/user';
import { MaintenanceListService } from './maintenance-list.service';


export const defaultGroup: Group={
  groupId: 1,
name: "NewGroup",
domain: "NewDomain"
}
export const DefaultUser: User = {
  id: "1",
  firstname: "FirstName",
  lastname: "LastName",
  email: "Default@default.com",
  group: defaultGroup,
  maintenanceLists: [],
  userName: "userName"

}

export const listitem1: ListItem = {
  listItemId: 1,
  maintenanceListId: 1,
  maintenanceList: {
    maintenanceListId: 0,
    title: "",
    applicationUser: DefaultUser,
    applicationUserId: "",
    group: defaultGroup,
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: [],
  },
  name: "item 1",
  location: {
    locationId: 1,
    name: "access lane A"

  },
  cost: 200,
  costYear: new Date(),
  maintenanceSchedule: {
    maintenanceScheduleId: 1,
    maintenanceInterval: 2,
    lastCompleted: new Date(),
    nextScheduledEventForcasted: new Date(),
    nextScheduledEventPlanned: new Date(),
    yearsToDelay: 12
  },
  comments: "",
  pictures: []

}

export const defaultList: MaintenanceList =
  {
    maintenanceListId: 0,
    title: "",
    applicationUser: DefaultUser,
    applicationUserId: "",
    group: defaultGroup,
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  }

export const LISTS: MaintenanceList[] = [
{
    maintenanceListId: 0,
  title: "",
    applicationUser: DefaultUser,
  applicationUserId: "",
  group: defaultGroup,
  creationDate: new Date(),
  lastEditDate: new Date(),
    listItems: []
  },
//  {
//    maintenanceListId: 1,
//    applicationUser: DefaultUser,
//    group: "ABC",
//    creationDate: new Date(),
//    lastEditDate: new Date(),
//    listItems: []
//  },
//  {
//    maintenanceListId: 2,
//    applicationUser: DefaultUser,
//    group: "Company",
//    creationDate: new Date(),
//    lastEditDate: new Date(),
//    listItems: []
//  },
//  {
//    maintenanceListId: 3,
//    applicationUser: DefaultUser,
//    group: "SDSU",
//    creationDate: new Date(),
//    lastEditDate: new Date(),
//    listItems: []
//  }
]
