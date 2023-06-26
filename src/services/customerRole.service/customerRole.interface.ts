interface Employee {
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
  Employees: Employee[];
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
  Type: null;
  Permissions: any[];
  Id: string;
  CreateBy: null;
  CreateDate: Date | string;
  LastModifiedBy: null;
  LastModifiedDate: null;
  AllowQuickPayment: any;
  TakeAppointment: any;
  AvailableBookingOnline: any;
}
