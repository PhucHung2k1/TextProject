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
