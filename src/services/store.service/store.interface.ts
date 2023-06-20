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
  MailingAddress: string;
  Email: string;
  State: string;
  ZipCode: string;
  PhoneNumber: number;
  TimeZone: string;
  GeoLatitude: string;
  GeoLongitude: string;
  ProfilePictureUrl: string;
  Id: string;
  ProfilePictureUrl: string;
  CreateBy: Date;
  CreateDate: Date;
  LastModifiedBy: Date;
  LastModifiedDate: Date;
  GoogleMapUrl: string;
  City: string;
  Address1: string;
  Address2: string;

}
export interface IConfigStore {
  step: number;
  component: React.ReactNode;
}
