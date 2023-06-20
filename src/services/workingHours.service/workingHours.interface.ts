export interface IWorkingHours {
  DayName: string;
  StartHours: string;
  EndHours: string;
  IsClosed: boolean;
  BreakTimes: IBreakTime[];
}

export interface IBreakTime {
  Id?: number;
  StartHours: string;
  EndHours: string;
}

