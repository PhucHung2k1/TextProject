// @flow
import { Box, Divider, Grid, Stack } from '@mui/material';
import React from 'react';
import { type ReactNode } from 'react';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle

interface Props {
  iconHeader: ReactNode;
  titleHeader: string;
  content: ReactNode;
  handleBack: Function;
  handleNext: Function;
  activeStep: number;
  steps: any;
}

export const LayoutDrawer = ({
  iconHeader,
  titleHeader,
  content,
  handleBack,
  handleNext,
  activeStep,
  steps,
}: Props) => {
  return (
    <Box className="flex h-screen flex-col  ">
      <Box className="flex h-16 w-[796px] items-center justify-center bg-white p-8 text-3xl font-semibold text-text-title">
        <Box
          onClick={() => handleBack()}
          className=" mr-auto cursor-pointer text-icon-color"
        >
          {iconHeader}
        </Box>
        <p className="mr-auto justify-center">{titleHeader}</p>
      </Box>
      <Box
        sx={{ height: 'calc(100vh- 176px)' }}
        className=" w-full overflow-auto px-8 pt-6 "
      >
        {content && content}
      </Box>
      <Box className="mt-auto h-28 w-full">
        <Divider />
        {/* Button bottom */}
        <Grid container className="p-8">
          <Grid xs={12} item>
            <Stack direction="row" spacing={2}>
              <Grid xs={6} item>
                <Box
                  onClick={() => handleBack()}
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary"
                >
                  Cancel
                </Box>
              </Grid>
              <Grid xs={6} item>
                <Box
                  onClick={() => handleNext()}
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold uppercase text-white"
                >
                  {activeStep === steps.length - 1 ? 'Save' : 'Continue'}
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
