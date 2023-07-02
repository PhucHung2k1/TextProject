export interface IEmployee {
  CustomerId: string;
  StoreId: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  UserType: string | any;
  JobTitle: string;
  NickName: string;
  Address: string | any;
  City: string | any;
  State: string | any;
  ZipCode: string | any;
  Country: string | any;
  SocialSecurity: string | any;
  StartDate: string;
  Status: boolean | any;
  PassCode: string | any;
  IsWorking: boolean | any;
  ProfilePictureUrl: string | any | any;
  IsOfficialStaff: boolean | any;
  AllowBookingOnline: string | any;
  IsAllowRating: boolean | any;
  InvitationDate: string | any;
  InvitationToken: string | any;
  InvitationIsAccepted: string | any;
  InvitationIsSent: string | any;
  Id: string;
  CreateBy: string | any;
  CreateDate: Date;
  LastModifiedBy: string | any;
  LastModifiedDate: string | any;
  Roles: ISubRoles[];
  PayStructure: ISubPayStructure;
}
interface ISubPayStructure {
  Id: string;
  StoreId: string;
  Name: string;
  Description: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: Date;
}
interface ISubRoles {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  SystemName: any;
  StoreId: string;
  Type: string;
  IsTechnician: any;
  TakeAppointment: boolean;
  AvailableBookingOnline: boolean;
  AllowQuickPayment: boolean;
  Permissions: any[];
  Id: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: any;
}
export interface IEmployeeSearch {
  Records: Record[];
  Pagination: Pagination;
}

export interface Pagination {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  TotalRecords: number;
}

export interface Record {
  Id: string;
  CustomerId: string;
  StoreId: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  UserType: string;
  JobTitle: string;
  NickName: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  StartDate: Date;
  Status: boolean;
  PassCode: string;
  InvitationIsAccepted: any;
  InvitationIsSent: any;
  ProfilePictureUrl: string;
  AccessMangoPos: any;
  Color: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: Date;
  Roles: Role[];
  PayStructure: PayStructure;
  ContextMenuItems: any;
  TotalRows: any;
}

interface PayStructure {
  Id: string;
  StoreId: string;
  Name: string;
  Description: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: Date;
}

interface Role {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  SystemName: any;
  StoreId: string;
  Type: string;
  IsTechnician: any;
  TakeAppointment: boolean;
  AvailableBookingOnline: boolean;
  AllowQuickPayment: boolean;
  Permissions: any[];
  Id: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: any;
}
