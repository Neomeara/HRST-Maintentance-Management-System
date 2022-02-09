import { MaintenanceList, ListItem } from '../Models/MaintenanceList';
import { User } from '../Models/user';
import { MaintenanceListService } from './maintenance-list.service';



export const user1: User = {
  id: "1",
  firstName: "nate",
  lastName: "omeara",
  email: "test@gmail.com",
  group: "hrst"

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
{
  maintenanceListId: 0,
  applicationUser: user1,
  group: "HRST",
  creationDate: new Date(),
  lastEditDate: new Date(),
    listItems: [listitem1, listitem1, listitem1
    ]
  },
  {
    maintenanceListId: 1,
    applicationUser: user1,
    group: "ABC",
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  },
  {
    maintenanceListId: 2,
    applicationUser: user1,
    group: "Company",
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  },
  {
    maintenanceListId: 3,
    applicationUser: user1,
    group: "SDSU",
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  }
]
