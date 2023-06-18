// @flow

import * as React from 'react';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}
export const LayoutStoreProfile = ({ children }: Props) => {
  return (
    <Box className="flex justify-center ">
      <Box className="relative  w-[568px] rounded-2xl bg-white shadow-md">
        <LinearProgressWithLabel />
        <Box className="px-8 pb-8 pt-12">{children}</Box>
      </Box>
    </Box>
  );
};
