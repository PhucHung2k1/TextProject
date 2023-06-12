import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

interface LayoutAddMemberProps {
  children: React.ReactNode;
  icon?: string;
  subTitle?: string;
}

const LayoutAddMember: React.FC<LayoutAddMemberProps> = ({
  children,
  icon,
  subTitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center  pt-[90px]">
      {/* <LinearProgressWithLabel value={progress} /> */}
      <div className=" flex w-[568px] flex-col items-center gap-5  rounded-2xl bg-white px-8 py-10 shadow-md">
        <div className="relative flex w-full items-center justify-center ">
          <div className="absolute left-0 cursor-pointer">
            {icon === 'back' ? (
              <ArrowBackIcon fontSize="large" className="text-icon-color" />
            ) : (
              <CloseIcon fontSize="large" className="text-icon-color" />
            )}
          </div>

          <div className="text-3xl font-semibold text-text-title">
            Add your staff member
          </div>
        </div>
        <div className="mt-[-10px] text-sm font-normal text-text-secondary">
          {subTitle}
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
        <div className="flex w-full flex-col items-center gap-5">
          <button
            type="button"
            className="h-12 w-full bg-[#5c5d6a1f] text-text-disable"
          >
            CONTINUE
          </button>
          <div className="flex items-center gap-1">
            <p> Invite later?</p>
            <p className="font-bold text-mango-primary-blue">Skip</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAddMember;
