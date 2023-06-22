import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useAppDispatch } from '@/store/hook';
import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from '@/components/StoreProfile/helper';
import { LayoutStoreProfile } from '../LayoutStoreProfile';
import { Box, Typography } from '@mui/material';

interface LayoutAddMemberProps {
  children: React.ReactNode;
  icon?: string;
  subTitle?: string;
  title: string;

  skip?: boolean;
  disableBtn?: boolean;
}

const LayoutAddMember: React.FC<LayoutAddMemberProps> = ({
  children,
  icon,
  subTitle,
  title,
  skip = false,
  disableBtn = false,
}) => {
  const dispatch = useAppDispatch();
  return (
    <LayoutStoreProfile>
      <div className="text-center">
        <Box className="mb-[8px] flex items-center justify-center">
          {icon === 'back' ? (
            <ArrowBackIcon
              fontSize="large"
              className="cursor-pointer text-3xl text-icon-color"
              onClick={() => handlePreviousProgressSetupStore(dispatch)}
            />
          ) : (
            <CloseIcon
              fontSize="large"
              className="cursor-pointer text-3xl text-icon-color"
            />
          )}
          <p className="mx-auto text-[32px] font-semibold text-text-title">
            {title}
          </p>
        </Box>
        <p className="text-[14px] text-mango-text-gray-2">{subTitle}</p>
      </div>

      <div className="w-full flex-1 ">{children}</div>
      <div className="flex w-full flex-col items-center gap-5">
        {disableBtn ? (
          <Button
            type="button"
            variant="contained"
            fullWidth
            disabled
            className="mt-7 h-12 w-full bg-mango-primary-blue  text-base font-bold capitalize text-white hover:bg-button-hover-cyan"
            sx={{ '&:hover': { backgroundColor: '#5c5d6a1f' } }}
          >
            CONTINUE
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={() => handleForwardProgressSetupStore(dispatch)}
            className="mt-7 h-12 w-full bg-mango-primary-blue  text-base font-bold capitalize text-white hover:bg-button-hover-cyan"
            sx={{ '&:hover': { backgroundColor: '#00bdd6' } }}
          >
            CONTINUE
          </Button>
        )}

        {skip && (
          <div className="flex items-center gap-1">
            <Typography> Invite later?</Typography>
            <Typography
              className="cursor-pointer font-bold text-mango-primary-blue hover:!underline"
              onClick={() => handleForwardProgressSetupStore(dispatch)}
            >
              Skip
            </Typography>
          </div>
        )}
      </div>
    </LayoutStoreProfile>
  );
};

export default LayoutAddMember;
