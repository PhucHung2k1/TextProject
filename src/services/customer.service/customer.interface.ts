export interface ICustomerProfile {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  IsVerified: boolean;
  City: string;
  StateProvince: string;
  ZipPostalCode: string;
  Country: string;
  Id: string;
  CreateDate: Date;
  LastModifiedDate: Date;
}
export interface ICustomer {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  Password: string;
  StateProvince: string;
  ZipPostalCode: string;
  City: string;
  Id: string;
  CreateDate: Date;
}
export interface ISendInvitationPayload {
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  customerRoleId: string;
  payStructure: string;
  serviceAndProduct: string;
  isSendInvitation: boolean;
}
export interface IConfirmInvitationPayload {
  Token: string;
}
export interface IInvitationListData {
  StoreId: string;
  Email: string;
  Phone: string;
  FirstName: string;
  LastName: string;
  InvitationDate: Date;
  InvitationToken: string;
  IsAccepted: boolean;
  IsSentMail: boolean;
  CustomerRoleId: string;
  ServiceAndProduct: string;
  PayStructure: string;
  JobTitle: string;
  Id: string;
  CreateDate: Date;
}
