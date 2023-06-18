export interface IStoreProfile {
  Id: string;
  PhoneNumber: string;
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
}
export interface IConfigStore {
  step: number;
  component: React.ReactNode;
}
