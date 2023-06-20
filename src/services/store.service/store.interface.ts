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
  MailingAddress: any;
  Email: string;
  State: any;
  ZipCode: any;
  PhoneNumber: number;
  TimeZone: any;
  GeoLatitude: any;
  GeoLongitude: any;
  GoogleMapUrl: any;
  Id: string;
  ProfilePictureUrl: string;
  CreateBy: Date;
  CreateDate: Date;
  LastModifiedBy: Date;
  LastModifiedDate: Date;
}
export interface IConfigStore {
  step: number;
  component: React.ReactNode;
}
