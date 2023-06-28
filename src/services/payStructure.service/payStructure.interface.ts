import type { IEmployeeResponse } from '../customerRole.service/customerRole.interface';

export interface IPayStructureData {
  Id: string;
  StoreId: string;
  Name: string;
  Type: string;
  Description: string;
  Employees: IEmployeeResponse[];
  CreateBy: Date | string;
  CreateDate: Date | string;
  LastModifiedBy: string;
  LastModifiedDate: Date;
}
