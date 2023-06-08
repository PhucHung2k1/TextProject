export interface ISignUp {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
export interface ISignUpVerify {
  customerId: string;
  otp: string;
}
export interface ISignUpSendVerify {
  email: string;
}
