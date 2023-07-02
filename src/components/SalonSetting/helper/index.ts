import type { PayStructureSettings } from '@/services/payStructure.service/payStructure.interface';

export const currentDataRadioWorkingTimeByType = (
  payStructureSettings: PayStructureSettings
) => {
  switch (payStructureSettings.WorkingTimeType) {
    case 'Week':
      return {
        valueType: payStructureSettings.WeekType,
        valueMinDay: payStructureSettings.WeekMinDay,
        nameMinDay: 'WeekMinDay',
        valueMinHour: payStructureSettings.WeekMinHour,
        nameMinHour: 'WeekMinHour',
        valueMinTotalHour: payStructureSettings.WeekMinTotalHour,
        nameMinTotalHour: 'WeekMinTotalHour',
        type: 'WeekType',
      };
    case 'Monthly':
      return {
        valueType: payStructureSettings.MonthType,
        valueMinDay: payStructureSettings.MonthMinDay,
        nameMinDay: 'MonthMinDay',
        valueMinHour: payStructureSettings.MonthMinHour,
        nameMinHour: 'MonthMinHour',
        valueMinTotalHour: payStructureSettings.MonthMinTotalHour,
        nameMinTotalHour: 'MonthMinTotalHour',
        type: 'MonthType',
      };
    case 'BaseOnPeriod':
      return {
        valueType: payStructureSettings.BaseOnPeriodType,
        valueMinDay: payStructureSettings.BaseOnPeriodMinDay,
        nameMinDay: 'BaseOnPeriodMinDay',
        valueMinHour: payStructureSettings.BaseOnPeriodMinHour,
        nameMinHour: 'BaseOnPeriodMinHour',
        valueMinTotalHour: payStructureSettings.BaseOnPeriodMinTotalHour,
        nameMinTotalHour: 'BaseOnPeriodMinTotalHour',
        type: 'BaseOnPeriodType',
      };
    default:
      return {
        valueType: payStructureSettings.WeekType,
        valueMinDay: payStructureSettings.WeekMinDay,
        nameMinDay: 'WeekMinDay',
        valueMinHour: payStructureSettings.WeekMinHour,
        nameMinHour: 'WeekMinHour',
        valueMinTotalHour: payStructureSettings.WeekMinTotalHour,
        nameMinTotalHour: 'WeekMinTotalHour',
        type: 'WeekType',
      };
  }
};
export const currentDataPayStructureByType = (
  payStructureSettings: PayStructureSettings
) => {
  switch (payStructureSettings.PayStructureType) {
    case 'Commission':
      return {
        label1Row1: 'Commission Payout',
        name1Row1: 'CommissionPayout',
        value1Row1: payStructureSettings.CommissionPayout,
        label2Row1: 'Max Hourly Payout',
        name2Row1: 'MaxCommissionPayout',
        value2Row1: payStructureSettings.MaxCommissionPayout,
      };
    case 'CommissionGuarantee':
      return {
        label1Row1: 'Commission Payout',
        name1Row1: 'CommissionPayout',
        value1Row1: payStructureSettings.CommissionPayout,
        label2Row1: 'Max Commission Payout',
        name2Row1: 'MaxCommissionPayout',
        value2Row1: payStructureSettings.MaxCommissionPayout,
      };
    case 'Hourly':
      return {
        label1Row1: 'Hourly Payout',
        name1Row1: 'HourlyPayout',
        value1Row1: payStructureSettings.HourlyPayout,
        label2Row1: 'Max Hourly Payout',
        name2Row1: 'MaxHourlyPayout',
        value2Row1: payStructureSettings.MaxHourlyPayout,
      };

    case 'Salary':
      return {
        label1Row1: 'Salary (Guarantee) Payout',
        name1Row1: 'SalaryGuaranteePayout',
        value1Row1: payStructureSettings.SalaryGuaranteePayout,
        label2Row1: 'Max Salary (Guarantee) Payout',
        name2Row1: 'MaxSalaryGuaranteePayout',
        value2Row1: payStructureSettings.MaxSalaryGuaranteePayout,
      };
    default:
      return {
        label1Row1: 'Commission Payout',
        name1Row1: 'CommissionPayout',
        value1Row1: payStructureSettings.CommissionPayout,
        label2Row1: 'Max Hourly Payout',
        name2Row1: 'MaxCommissionPayout',
        value2Row1: payStructureSettings.MaxCommissionPayout,
      };
  }
};
