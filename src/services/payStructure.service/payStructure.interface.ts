export interface IPayStructureData {
  Configurations: Configuration[];
  Name: string;
  Value: string;
  Description: null;
  Id: string;
  CreateBy: null;
  CreateDate: null;
  LastModifiedBy: null;
  LastModifiedDate: null;
}

export interface Configuration {
  SystemName: string;
  Name: string;
  Description: null;
  Value: string;
  PayStructureId: string;
}
