import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgressWithLabel } from '../LinearProgressWithLabel';
import Button from '@mui/material/Button';

interface LayoutAddMemberProps {
  children: React.ReactNode;
  icon?: string;
  subTitle?: string;
  title: string;
  process: number;
  skip?: boolean;
  disableBtn?: boolean;
}

const LayoutAddMember: React.FC<LayoutAddMemberProps> = ({
  children,
  icon,
  subTitle,
  title,
  process = 0,
  skip = false,
  disableBtn = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center  pt-[90px]">
      {/* <LinearProgressWithLabel value={progress} /> */}

      <div className=" relative flex w-[568px] flex-col items-center  gap-5 rounded-2xl bg-white px-8 py-10 shadow-md">
        <div className="absolute top-0 w-[568px]">
          <LinearProgressWithLabel value={process} />
        </div>
        <div className="relative flex w-full items-center justify-center ">
          <div className="absolute left-0 cursor-pointer">
            {icon === 'back' ? (
              <ArrowBackIcon fontSize="large" className="text-icon-color" />
            ) : (
              <CloseIcon fontSize="large" className="text-icon-color" />
            )}
          </div>

          <div className="text-3xl font-semibold text-text-title">{title}</div>
        </div>
        <div className="mt-[-10px] text-sm font-normal text-text-secondary">
          {subTitle}
        </div>
        <div className="w-full flex-1 ">{children}</div>
        <div className="flex w-full flex-col items-center gap-5">
          {disableBtn ? (
            <Button
              type="button"
              variant="contained"
              fullWidth
              disabled
              className="h-12 w-full bg-bg-disable text-base font-semibold text-text-disable"
              sx={{ '&:hover': { backgroundColor: '#5c5d6a1f' } }}
            >
              CONTINUE
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              fullWidth
              className="h-12 w-full bg-primary-main text-base font-semibold text-white"
              sx={{ '&:hover': { backgroundColor: '#00bdd6' } }}
            >
              CONTINUE
            </Button>
          )}

          {skip && (
            <div className="flex items-center gap-1">
              <p> Invite later?</p>
              <p className="font-bold text-mango-primary-blue">Skip</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutAddMember;
