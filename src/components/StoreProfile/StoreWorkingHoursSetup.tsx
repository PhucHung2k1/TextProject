import { Switch } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";

const StoreWorkingHoursSetup: NextPage = () => {
  const listData = [
    { id: 1, day: "Sunday", workTime: "Closed" },
    { id: 2, day: "Monday", workTime: "9:00 AM - 9:00 PM" },
    { id: 3, day: "Tuesday", workTime: "9:00 AM - 9:00 PM" },
    { id: 4, day: "Wednesday", workTime: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Thursday", workTime: "9:00 AM - 9:00 PM" },
    { id: 6, day: "Friday", workTime: "9:00 AM - 9:00 PM" },
    { id: 7, day: "Saturday", workTime: "Closed" },
  ];
  return (
    <div className="flex h-screen w-full items-center justify-center bg-mango-gray-light-2 bg-cover bg-center bg-no-repeat ">
      <div className="flex min-h-[70%] w-[35%] flex-col items-center justify-between gap-2 rounded-2xl bg-white p-6 py-5">
        {/* <div className="absolute left-[0px] top-[0px]  h-4 w-full rounded-t-xl bg-primary-states-hover" />
        <div className="absolute left-[0px] top-[0px] h-4 w-60 rounded-t-xl [background:linear-gradient(90deg,_#80dfeb_68.23%,_rgba(255,_255,_255,_0.52)_99.99%,_rgba(0,_240,_255,_0))]" /> */}
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
        <div className="w-[90%] flex flex-col justify-center gap-[12px] text-text-primary">
          {listData.map((item) => (
            <div key={item.id}>
              <div>
                <div className="flex flex-row items-center justify-start">
                  <div>
                    <Switch className="p-3" />
                  </div>
                  <div className="font-semibold w-[70px] leading-[140%]">
                    {item.day}
                  </div>
                  <div className="w-[70%] text-center leading-[140%]">
                    {item.workTime}
                  </div>
                  {item.workTime !== "Closed" ? (
                    <Image
                      src="/chevronrightfilled.svg"
                      width="20"
                      height="20"
                      alt=""
                      objectFit="cover"
                      className="hidden overflow-hidden"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="box-border h-px w-[100] border-t-[1px] border-solid border-line-light p-[5px]" />
            </div>
          ))}
          <button
            type="button"
            className="mt-8 box-border flex w-[100%] flex-col items-center justify-center overflow-hidden rounded bg-primary-main px-[22px] py-[13px] text-[18px] font-bold text-primary-contrast shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)]"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};
export default StoreWorkingHoursSetup;
