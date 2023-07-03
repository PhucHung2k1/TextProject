import type { IEmployeeResponse } from '../customerRole.service/customerRole.interface';

export interface IPayStructureData {
  Id: string;
  StoreId: string;
  Name: string;
  Type: string;
  Description: string;
  Employees: IEmployeeResponse[];
  Configuration: PayStructureConfiguration;
}

export interface ICreatePayStructurePayLoad {
  PayStructure: PayStructure | object;
  Configuration: PayStructureConfiguration | object;
}

export interface PayStructure {
  Name: string;
}

export interface PayStructureConfiguration {
  PayStructureSettings: PayStructureSettings;
  TipOnCC: TipOnCC;
  DailySurcharge: DailySurcharge;
  ProductCharge: ProductCharge;
  ProductCommission: ProductCommission;
  HoldCash: HoldCash;
  CheckCashPercentage: CheckCashPercentage;
}

export interface CheckCashPercentage {
  TipFeeCheckPercentage: number;
  SurchargeCheckPercentage: number;
}

export interface DailySurcharge {
  DailySurchargeType: string;
  DailySurchargeFromCommission: number;
  DailySurchargeFixedSurcharge: number;
  DailySurchargeWorkingTimeType: string;
  DailySurchargeWorkingDailyMinHour: number;
  DailySurchargeWorkingWeeklyType: string;
  DailySurchargeWorkingWeeklyMinHour: number;
  DailySurchargeWorkingWeeklyMinDay: number;
  DailySurchargeWorkingWeeklyMinTotalHour: number;
}

export interface HoldCash {
  AllowHoldCash: boolean;
}

export interface PayStructureSettings {
  PayStructureType: string;
  PotentialBonus: number;
  CommissionPayout: number;
  MaxCommissionPayout: number;
  SalaryGuaranteePayout: number;
  HourlyPayout: number;
  MaxHourlyPayout: number;
  MaxSalaryGuaranteePayout: number;
  AllowSalaryAndCommissionCombination: boolean;
  RequiresWorkingTimeOver: boolean;
  WorkingTimeType: string;
  DayMinHour: number;
  WeekType: string;
  WeekMinHour: number;
  WeekMinDay: number;
  WeekMinTotalHour: number;
  MonthType: string;
  MonthMinHour: number;
  MonthMinDay: number;
  MonthMinTotalHour: number;
  BaseOnPeriodType: string;
  BaseOnPeriodMinHour: number;
  BaseOnPeriodMinDay: number;
  BaseOnPeriodMinTotalHour: number;
}

export interface ProductCharge {
  ProductChargeType: string;
  BaseOnTicketAmount: number;
  BaseOnTicketMinChargeAmount: number;
  BaseOnTicketMinChargePercent: number;
}

export interface ProductCommission {
  AllowProductCommission: boolean;
  ProductCommissionPercent: number;
  MaxPayoutProductCommissionPercent: number;
}

export interface TipOnCC {
  TipOnCCType: string;
  TipOnCCFeeFromCreditCard: string;
  TipOnCCDailyFixedFee: string;
}
export interface IPayStructureById {
  PayStructure: PayStructureById;
  Configuration: PayStructureConfiguration;
}
export interface PayStructureById {
  Id: string;
  StoreId: string;
  Name: string;
  Description: null;
  CreateBy: null;
  CreateDate: Date | string;
  LastModifiedBy: null;
  LastModifiedDate: null;
}
