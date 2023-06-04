export interface IAuthResponse {
  email: string
  sub: string
  id: string
  userName: string
  store: string
  accessToken: string
  refreshToken: string
  lastName: string
  firstName: string
  expiresIn: number
  refreshTokenExpiresIn: number
  issued: any
  iat: number
  exp: number
  jti: string
}
