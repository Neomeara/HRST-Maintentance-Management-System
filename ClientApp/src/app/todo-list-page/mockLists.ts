import { MaintenanceList, ListItem } from '../Models/MaintenanceList';
import { User } from '../Models/user';
import { MaintenanceListService } from './maintenance-list.service';



export const DefaultUser: User = {
  id: "1",
  firstName: "FirstName",
  lastName: "LastName",
  email: "Default@default.com",
  group: "group"

}

export const listitem1: ListItem = {
  listItemId: 1,
  maintenanceListId: 1,
  //MaintenanceList: LISTS[0],
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

export const LISTS: MaintenanceList[] = [
//{
//  maintenanceListId: 0,
//  applicationUser: DefaultUser,
//  group: "HRST",
//  creationDate: new Date(),
//  lastEditDate: new Date(),
//    listItems: [listitem1, listitem1, listitem1
//    ]
//  },
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
