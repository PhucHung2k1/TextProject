export interface IStoreProfile {
  Id: string;
  Name: string;
  PhoneNumber: string;
  ProfilePictureUrl: string;
  Email: string;
  IsVerified: boolean;
  UserName: string;
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
  RefreshTokenExpiresIn: number;
}
export interface IStoreCustomer {
  Name: string;
  Email: string;
  PhoneNumber: number;
  TimeZone: string;
  GeoLatitude: string;
  GeoLongitude: string;
  ProfilePictureUrl: string;
  Id: string;
  CreateDate: Date;
  LastModifiedDate: Date;
  State: string;
  ZipCode: string;
  MailingAddress: string;
  GoogleMapUrl: string;
  City: string;
  Address1: string;
  Address2: string;
}
export interface IConfigStore {
  step: number;
  component: React.ReactNode;
}
