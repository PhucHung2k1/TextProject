export interface IAuthResponse {
  Id: string;
  UserName: string;
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
  RefreshTokenExpiresIn: number;
}
