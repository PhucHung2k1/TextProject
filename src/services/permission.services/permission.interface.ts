export interface PermissionItem {
  id: number;
  name: string;
  value: boolean;
}
export interface IPermissionData {
  Appointments: IPermissionChild[];
  Marketings: IPermissionChild[];
  ClientManagements: IPermissionChild[];
  CreateCharges: IPermissionChild[];
  TicketManagers: IPermissionChild[];
  SalonExchanges: IPermissionChild[];
  SalonSettings: IPermissionChild[];
  SalonCenters: IPermissionChild[];
  NeedHelps: IPermissionChild[];
  TechPortals: IPermissionChild[];
  [key: string]: any; // add index signature ??? wtf
}

export interface IPermissionChild {
  Name: string;
  SystemName: string;
  Category: string;
  Id: string;
  CreateBy: null;
  CreateDate: null;
  LastModifiedBy: null;
  LastModifiedDate: null;
}
