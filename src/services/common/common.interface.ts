export interface ILookupData {
  TimeZone: CountryPhone[];
  CountryPhone: CountryPhone[];
  PayStructure: CountryPhone[];
  ProductType: CountryPhone[];
}
export interface CountryPhone {
  Value: string;
  Name: string;
  Description: string;
}
