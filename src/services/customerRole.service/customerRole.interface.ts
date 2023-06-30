export interface IEmployeeResponse {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  Status: any;
  ProfilePictureUrl: string;
  Id: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: any;
}
interface PermissionItem {
  Name: string;
  SystemName: string;
  Category: string;
  Id: string;
  CreateBy: null;
  CreateDate: string;
  LastModifiedBy: null;
  LastModifiedDate: null;
}
export interface IAllCustomerRole {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  SystemName?: string;
  Permissions: PermissionItem[];
  Id: string;
  StoreId?: string;
  CreateDate?: Date;
  Employees: IEmployeeResponse[];
}

export interface IAddRemoveMultiRole {
  AddedPermissions: string[];
  RemovedPermissions: string[];
}
export interface IDetailRoleById {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  SystemName: null;
  StoreId: string;
  Type: string;
  IsTechnician: boolean;
  TakeAppointment: boolean;
  AvailableBookingOnline: boolean;
  AllowQuickPayment: boolean;
  Permissions: any[];
  Id: string;
  CreateBy: null;
  CreateDate: Date;
  LastModifiedBy: null;
  LastModifiedDate: null;
  [key: string]: any;
}
export interface IAddRemoveMultiRoleEmployeeData {
  AddedEmployeeIds: string[];
  RemovedEmployeeIds: string[];
}

export interface IAddRemoveMultiRoleEmployee {
  roleId: string;
  data: IAddRemoveMultiRoleEmployeeData;
}
export interface IAddRemoveMultiPayStructureEmployee {
  payStructureId: string;
  data: IAddRemoveMultiRoleEmployeeData;
}
export interface IPatchPayloadData {
  op: string;
  path: string;
  value: string;
}
