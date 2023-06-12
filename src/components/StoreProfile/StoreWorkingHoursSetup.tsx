import { Switch } from '@mui/material';
import type { NextPage } from 'next';

const StoreWorkingHoursSetup: NextPage = () => {
  const listData = [
    { id: 1, day: 'Sunday', workTime: 'Closed' },
    { id: 2, day: 'Monday', workTime: '9:00 AM - 9:00 PM' },
    { id: 3, day: 'Tuesday', workTime: '9:00 AM - 9:00 PM' },
    { id: 4, day: 'Wednesday', workTime: '9:00 AM - 9:00 PM' },
    { id: 5, day: 'Thursday', workTime: '9:00 AM - 9:00 PM' },
    { id: 6, day: 'Friday', workTime: '9:00 AM - 9:00 PM' },
    { id: 7, day: 'Saturday', workTime: 'Closed' },
  ];
  return (
    <div className="relative h-[1080px] w-full bg-background-paper-elevation-1 text-center text-base text-text-secondary">
      <div className="absolute left-[676px] top-[calc(50%_-_400px)] h-[716px] w-[568px] rounded-2xl bg-primary-contrast">
        <div className="absolute left-[0px] top-[0px]  h-4 w-full rounded-t-xl bg-primary-states-hover" />
        <div className="absolute left-[0px] top-[0px] h-4 w-60 rounded-t-xl [background:linear-gradient(90deg,_#80dfeb_68.23%,_rgba(255,_255,_255,_0.52)_99.99%,_rgba(0,_240,_255,_0))]" />
        <div className=" my-12 text-center">
          <div className="flex items-center justify-center ">
            <img
              className="cursor-pointer text-3xl"
              src="/arrowbackfilled.svg"
              alt=""
            />

            <p className="mx-auto text-[32px] font-semibold text-text-title">
              Add your working hours
            </p>
          </div>

          <p className="text-[14px] text-mango-text-gray-2">
            Set up working time for clients to easily book an appointment with
            you
          </p>
        </div>
        <div className="ml-8 mt-12 flex flex-col justify-center gap-[12px] text-text-primary">
          {listData.map((item) => (
            <div key={item.id} className="relative h-[38px] w-[289px]">
              <div className="absolute left-[0px] top-[2px] h-[38px] w-[133px]">
                <div className="absolute left-[0px] top-[2px] flex flex-row items-center justify-start">
                  <div className="relative h-[38px] w-[58px]">
                    <Switch className="absolute left-[0px] top-[5px] flex flex-row items-center justify-start p-3" />
                  </div>
                  <div className="relative hidden leading-[140%]">{`{Label}`}</div>
                </div>
                <div className="absolute left-[74px] top-[15px] font-semibold leading-[140%]">
                  {item.day}
                </div>
              </div>
              <div className="absolute left-[236px] top-[15px] w-[70%] text-center leading-[140%]">
                {item.workTime}
              </div>
              {item.workTime !== 'Closed' ? (
                <img
                  className="absolute left-[480px] top-[7px] h-6 w-6 overflow-hidden"
                  alt=""
                  src="/chevronrightfilled1.svg"
                />
              ) : (
                ''
              )}
              <img
                className="absolute left-[480px] top-[7px] hidden h-6 w-6 overflow-hidden"
                alt=""
                src="/chevronrightfilled.svg"
              />
              <div className="relative box-border h-px w-[505px] border-t-[1px] border-solid border-line-light p-[5px]" />
            </div>
          ))}
          <button
            type="button"
            className="mt-20 box-border flex w-[90%] flex-col items-center justify-center overflow-hidden rounded bg-primary-main px-[22px] py-[13px] text-[18px] font-bold text-primary-contrast shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)]"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};
export default StoreWorkingHoursSetup;
