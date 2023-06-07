export interface IAllCustomerRole {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  StoreId: string;
  Permissions: any[];
  Id: string;
  CreateDate: Date;
}
