export interface ISignUp {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  zipPostalCode?: string;
  country?: string;
}
