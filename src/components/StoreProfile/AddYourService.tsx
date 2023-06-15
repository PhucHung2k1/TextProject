import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  LinearProgress,
  FormGroup,
  Switch,
  FormControlLabel,
} from '@mui/material';

// import { LinearProgressWithLabel } from '../LinearProgressWithLabel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ArrowBack } from '@mui/icons-material';

const LayoutAddMember = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return Math.min(oldProgress);
      });
    });

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="relative flex justify-center pt-[90px]">
      {/* <LinearProgressWithLabel value={progress} /> */}

      <div className="  relative  w-[568px] overflow-hidden rounded-2xl bg-white p-8 text-center shadow-md">
        <Box className=" absolute left-0 top-0 w-[568px]">
          <LinearProgress
            variant="determinate"
            value={80}
            className=" h-[8px] rounded-t-lg"
            sx={{
              background: `linear-gradient(90deg, #00BDD614 8% ${
                100 - progress
              }%, #9c64f4 100%)`,
              '> span': {
                background:
                  'linear-gradient(90deg, #80DFEB 80%, #FFFFFF86 89%, #00F0FF00 0%);',
              },
            }}
          />
        </Box>
        <div className="absolute top-0 w-[568px]" />
        <div className="relative flex w-full items-center justify-center ">
          <div className="absolute left-0 cursor-pointer">
            <ArrowBack fontSize="large" />
          </div>

          <p className="mb-[8px] mt-[16px] text-center text-[32px] font-semibold text-text-title">
            Add your service
          </p>
        </div>
        <p className="mb-[48px] text-center text-[14px] text-mango-text-gray-2">
          Set up services for clients to easily book an appointment with you
        </p>
        <FormGroup>
          <FormControlLabel
            className="ml-[1px]"
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#00BDD6',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#00BDD6',
              },
            }}
            control={<Switch />}
            label={
              <Box
                component="div"
                className="text-[16px] font-medium text-[#404044]"
              >
                Use Mango default category
              </Box>
            }
          />
        </FormGroup>
        <div className="w-full flex-1 ">
          <div className=" mb-[20x] mt-[25px] flex h-[166px] w-full ">
            <div
              className="flex w-full
        cursor-pointer items-center  justify-center gap-2 rounded-lg border border-[#CBCBDB] bg-[#F9F9FA]"
            >
              <PersonAddIcon fontSize="medium" />
              <div className="mt-1 text-base font-semibold">Add service</div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-5">
          <Button
            className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize hover:bg-[#00ADC3]"
            variant="contained"
          >
            CONTINUE
          </Button>

          <div className="mt-1 flex">
            <p>Set category for you?</p>
            <span className="ml-1 font-bold text-mango-primary-blue">
              Contact us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAddMember;
