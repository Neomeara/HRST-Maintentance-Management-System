export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group: Group;
}
export interface Group {
  GroupId: number;
  Name: string;
  Domain: string;
}
