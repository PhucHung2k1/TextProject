import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from '@/components/StoreProfile/helper';
import { useAppDispatch } from '@/store/hook';
import { Switch } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayoutStoreProfile } from './LayoutStoreProfile';

const StoreWorkingHoursSetup: NextPage = () => {
  const dispatch = useAppDispatch();
  const listData = [
    { id: 1, day: 'Sunday', workTime: 'Closed' },
    { id: 2, day: 'Monday', workTime: '9:00 AM - 9:00 PM' },
    { id: 3, day: 'Tuesday', workTime: '9:00 AM - 9:00 PM' },
    { id: 4, day: 'Wednesday', workTime: '9:00 AM - 9:00 PM' },
    { id: 5, day: 'Thursday', workTime: '9:00 AM - 9:00 PM' },
    { id: 6, day: 'Friday', workTime: '9:00 AM - 9:00 PM' },
    { id: 7, day: 'Saturday', workTime: 'Closed' },
  ];
  const router = useRouter();
  const editBusinessHoursRouter = () => {
    router.push('/edit-business-hours');
  };
  return (
    <LayoutStoreProfile>
      <div className=" my-12 text-center">
        <div className="flex items-center justify-center ">
          <ArrowBackIcon
            onClick={() => handlePreviousProgressSetupStore(dispatch)}
            className="cursor-pointer text-3xl"
          />
          <p className="mx-auto text-[32px] font-semibold text-text-title">
            Add your working hours
          </p>
        </div>

        <p className="text-[14px] text-mango-text-gray-2">
          Set up working time for clients to easily book an appointment with you
        </p>
      </div>
      <div className="flex w-[90%] flex-col justify-center gap-[12px] text-text-primary">
        {listData.map((item) => (
          <div key={item.id}>
            <div>
              <div className="flex flex-row items-center justify-start">
                <div>
                  <Switch className="p-3" />
                </div>
                <div className="w-[70px] font-semibold leading-[140%]">
                  {item.day}
                </div>
                <div className="w-[70%] text-center leading-[140%]">
                  {item.workTime}
                </div>
                {item.workTime !== 'Closed' ? (
                  <Image
                    src="/chevronrightfilled.svg"
                    width="20"
                    height="20"
                    alt=""
                    objectFit="cover"
                    className="hidden overflow-hidden"
                    onClick={editBusinessHoursRouter}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="box-border h-px w-[100] border-t-[1px] border-solid border-line-light p-[5px]" />
          </div>
        ))}
        <button
          onClick={() => handleForwardProgressSetupStore(dispatch)}
          type="button"
          className="mt-8 box-border flex w-[100%] flex-col items-center justify-center overflow-hidden rounded bg-primary-main px-[22px] py-[13px] text-[18px] font-bold text-primary-contrast shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)]"
        >
          CONTINUE
        </button>
      </div>
    </LayoutStoreProfile>
  );
};
export default StoreWorkingHoursSetup;
