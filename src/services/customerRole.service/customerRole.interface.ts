export interface IAllCustomerRole {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  SystemName?: string;
  Permissions: any[];
  Id: string;
  StoreId?: string;
  CreateDate?: Date;
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
}
