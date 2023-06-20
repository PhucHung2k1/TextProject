export interface IWorkingHours {
  DayName: string;
  StartHours: string;
  EndHours: string;
  IsClosed: boolean;
  BreakTimes: IBreakTime[];
}

export interface IBreakTime {
  DayName?: string;
  StartHours: string;
  EndHours: string;
}
