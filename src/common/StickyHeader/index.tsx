import React, { useState, useEffect } from 'react';
import { Divider, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IHeaderMemberProps {
  handleCloseDrawer: any;
  isShowDivider: any;
  title: string;
}
const StickyListWithDivider = ({
  handleCloseDrawer,
  title,
  isShowDivider,
}: IHeaderMemberProps) => {
  return (
    <div className="sticky top-0 z-10 mb-4 bg-white pb-[20px] pt-[32px]">
      <div className="text-center text-3xl font-semibold text-text-title">
        <p>{title}</p>
      </div>
      <Box
        onClick={(event) => handleCloseDrawer(event)}
        className="absolute left-5 top-8 cursor-pointer text-icon-color"
      >
        <CloseIcon fontSize="large" />
      </Box>
      {isShowDivider && <Divider />}
    </div>
  );
};

export default StickyListWithDivider;
