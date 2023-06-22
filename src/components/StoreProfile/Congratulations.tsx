import Image from 'next/image';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleResetProgressSetupStore } from './helper';

const Congratulations = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <LayoutStoreProfile>
      <div className="">
        <div className="text-center">
          <p className="mb-[8px] mt-[16px] text-center text-[32px] font-semibold text-text-title">
            Congratulations!
          </p>
        </div>
        <div className="mt-[34px] text-center">
          <Image
            src="/assets/images/StoreProfile/image-welcome.svg"
            alt="img-welcome"
            width={228}
            height={238}
            objectFit="cover"
          />
        </div>

        <div className="text-center my-[32px]">
          <p className="text-base text-primary-dark">
            Your Mango For Salon is now available. Keep discovering how to
            manage your own business or contact us for assistance.
          </p>
        </div>
        <div className="flex w-full items-center justify-center gap-5">
          <Button
            className="w-[240px] h-[48px] text-mango-text-gray-2 border-border-secondary  text-base font-bold capitalize hover:bg-[#5C5D6A29] hover:border-border-secondary"
            variant="outlined"
          >
            CONTACT MANGO
          </Button>
          {/* <div
            className="flex h-12 w-[45%] items-center
            justify-center rounded border border-border-secondary text-base font-bold uppercase text-text-secondary "
          >
            Contact mango
          </div> */}
          <Button
            variant="contained"
            onClick={() => {
              router.push('/');
              handleResetProgressSetupStore(dispatch);
            }}
            className="flex w-[240px] h-[48px] items-center justify-center rounded bg-primary-main text-base font-bold uppercase text-white !shadow-none hover:!bg-primary-main hover:!opacity-80"
          >
            Explore
          </Button>
        </div>
      </div>
    </LayoutStoreProfile>
  );
};

export default Congratulations;
