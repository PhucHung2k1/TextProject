import type { IEmployeeResponse } from '../customerRole.service/customerRole.interface';

export interface IPayStructureData {
  Id: string;
  StoreId: string;
  Name: string;
  Type: string;
  Description: string;
  Employees: IEmployeeResponse[];
  CreateBy: Date | string;
  CreateDate: Date | string;
  LastModifiedBy: string;
  LastModifiedDate: Date;
}
export interface ICreatePayStructurePayLoad {
  payStructure: PayStructure;
  payStructureConfiguration: PayStructureConfiguration;
}

export interface PayStructure {
  name: string;
  description: string;
}

export interface PayStructureConfiguration {
  payStructureSettings: PayStructureSettings;
  tipOnCC: TipOnCC;
  dailySurcharge: DailySurcharge;
  productCharge: ProductCharge;
  productCommission: ProductCommission;
  holdCash: HoldCash;
  checkCashPercentage: CheckCashPercentage;
}

export interface CheckCashPercentage {
  tipFeeCheckPercentage: number;
  surchargeCheckPercentage: number;
}

export interface DailySurcharge {
  dailySurchargeType: string;
  dailySurchargeFromCommission: number;
  dailySurchargeFixedSurcharge: number;
  dailySurchargeWorkingTimeType: string;
  dailySurchargeWorkingDailyMinHour: number;
  dailySurchargeWorkingWeeklyType: string;
  dailySurchargeWorkingWeeklyMinHour: number;
  dailySurchargeWorkingWeeklyMinDay: number;
  dailySurchargeWorkingWeeklyMinTotalHour: number;
}

export interface HoldCash {
  allowHoldCash: boolean;
}

export interface PayStructureSettings {
  payStructureType: string;
  potentialBonus: number;
  commissionPayout: number;
  maxCommissionPayout: number;
  salaryGuaranteePayout: number;
  maxSalaryGuaranteePayout: number;
  allowSalaryAndCommissionCombination: boolean;
  requiresWorkingTimeOver: boolean;
  workingTimeType: string;
  dayMinHour: number;
  weekType: string;
  weekMinHour: number;
  weekMinDay: number;
  weekMinTotalHour: number;
  monthType: string;
  monthMinHour: number;
  monthMinDay: number;
  monthMinTotalHour: number;
  baseOnPeriodType: string;
  baseOnPeriodMinHour: number;
  baseOnPeriodMinDay: number;
  baseOnPeriodMinTotalHour: number;
}

export interface ProductCharge {
  productChargeType: string;
  baseOnTicketAmount: number;
  baseOnTicketMinChargeAmount: number;
  baseOnTicketMinChargePercent: number;
}

export interface ProductCommission {
  allowProductCommission: boolean;
  productCommissionPercent: number;
  maxPayoutProductCommissionPercent: number;
}

export interface TipOnCC {
  tipOnCCType: string;
  tipOnCCFeeFromCreditCard: string;
  tipOnCCDailyFixedFee: number;
}
