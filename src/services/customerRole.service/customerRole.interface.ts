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
