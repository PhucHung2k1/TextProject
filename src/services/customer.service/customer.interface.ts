export interface ICustomerProfile {
  Customer: ICustomer;
  CustomerRoles: any[];
}

export interface ICustomer {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  Password: string;
  StateProvince: string;
  ZipPostalCode: string;
  City: string;
  Id: string;
  CreateDate: Date;
}
