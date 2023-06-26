// @flow
import { ProgressComponent } from '@/common/ProgressComponent';
import { Box, Button, Divider, Stack } from '@mui/material';
import React from 'react';
import { type ReactNode } from 'react';
import type { ISteps } from './DrawerRolePermission';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle

interface Props {
  iconHeader: ReactNode;
  titleHeader: string;
  content: ReactNode;
  handleBack: Function;
  handleNext: Function;
  activeStep: number;
  steps: ISteps[];
  handleCloseDrawer: Function;
  disable: boolean;
}

const LayoutDrawer = ({
  iconHeader,
  titleHeader,
  content,
  handleBack,
  handleNext,
  activeStep,
  steps,
  handleCloseDrawer,
  disable,
}: Props) => {
  const heightHeader = { number: 72, className: 'h-[72px]' };
  const heightFooter = { number: 92, className: 'h-[92px]' };
  const heightContent = {
    number: heightHeader.number + heightFooter.number,
    className: `calc(100vh - ${heightHeader.number + heightFooter.number}px)`,
  };
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Box className="flex h-screen w-[796px] flex-col">
      <Box
        className={`${heightHeader.className} flex items-center justify-center bg-white p-8 text-3xl font-semibold text-text-title`}
      >
        <ProgressComponent progress={progress} />
        <Box
          onClick={() => handleBack()}
          className=" mr-auto cursor-pointer text-icon-color"
        >
          {iconHeader}
        </Box>
        <p className="mr-auto  justify-center">{titleHeader}</p>
      </Box>
      <Box
        sx={{ height: heightContent.className }}
        className=" w-full overflow-auto px-8 pt-4"
      >
        {content && content}
      </Box>
      <Box className={`${heightFooter.className} w-full`}>
        <Divider orientation="horizontal" flexItem />
        {/* Button bottom */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          className="px-8"
          alignItems="center"
          height="99%"
        >
          <Box
            onClick={() => handleCloseDrawer()}
            className="flex h-12 w-1/2 cursor-pointer items-center justify-center rounded-[4px] border border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary"
          >
            Cancel
          </Box>

          <Button
            variant="contained"
            onClick={() => handleNext()}
            disabled={disable}
            className="flex h-12 w-1/2 cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold uppercase text-white"
          >
            {activeStep === steps.length - 1 ? 'Save' : 'Continue'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default LayoutDrawer;
