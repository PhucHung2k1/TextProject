import Image from 'next/image';
import { LayoutStoreProfile } from './LayoutStoreProfile';

const Congratulations = () => {
  return (
    <LayoutStoreProfile>
      <div className="flex flex-col items-center gap-8 px-8 pb-8 pt-12">
        <div className=" text-center">
          <div className="flex items-center justify-center ">
            <p className="mx-auto text-[32px] font-semibold">
              Congratulations!
            </p>
          </div>
        </div>
        <Image
          src="/assets/images/StoreProfile/image-welcome.svg"
          alt="img-welcome"
          width={228}
          height={238}
          objectFit="cover"
        />
        <div className="text-center">
          <p className="text-base text-primary-dark">
            Your Mango For Salon is now available. Keep discovering how to
            manage your own business or contact us for assistance.
          </p>
        </div>
        <div className="flex w-full items-center justify-center gap-5">
          <div
            className="flex h-12 w-[45%] items-center 
            justify-center rounded border border-border-secondary text-base font-bold uppercase text-text-secondary "
          >
            Contact mango
          </div>
          <div className="flex h-12 w-[45%] items-center justify-center rounded bg-primary-main text-base font-bold uppercase text-white">
            Explore
          </div>
        </div>
      </div>
    </LayoutStoreProfile>
  );
};

export default Congratulations;
