export interface IEmployeeEdit {
  Roles: Role[];
  PayStructure: PayStructure;
  Information: Information;
}

interface Information {
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
  Id: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: Date;
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
