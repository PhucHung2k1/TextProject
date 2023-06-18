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
  Id: string;
  CreateDate: Date;
  LastModifiedDate: Date;
  ProfilePictureUrl: string;
}
export interface IConfigStore {
  step: number;
  component: React.ReactNode;
}
