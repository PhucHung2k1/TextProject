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

export interface IConfigStore {
  step: number,
  component: React.ReactNode
}