import { MaintenanceList, ListItem } from '../Models/MaintenanceList';
import { Group, User } from '../Models/user';


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
  name: "item 1",
  locationId: 1,

  cost: 200,
  costYear: new Date(),
  maintenanceScheduleId: 1,
  comments: "",
  pictures: []

}

export const defaultList: MaintenanceList =
  {
    maintenanceListId: 0,
    title: "",
    applicationUserId: "",
    groupId: defaultGroup.groupId,
    creationDate: new Date(),
    lastEditDate: new Date(),
    listItems: []
  }

export const LISTS: MaintenanceList[] = [
{
    maintenanceListId: 0,
  title: "",
  applicationUserId: "",
  groupId: defaultGroup.groupId,
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
