import {
  Button,
  TextField,
  InputAdornment,
  Divider,
  Box,
  LinearProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';

import Image from 'next/image';

const AboutYourBusiness = () => {
  const [selectedImage, setSelectedImage] = useState<Blob>();
  const [progress, setProgress] = useState<number>(0);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
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
    <div>
      <div className="relative flex justify-center pt-[90px]">
        <div className=" relative  w-[568px] overflow-hidden rounded-2xl bg-white p-8 shadow-md	">
          <Box className=" absolute left-0 top-0 w-[568px]">
            <LinearProgress
              variant="determinate"
              value={40}
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
          <p className="mb-[8px] mt-[16px] text-center text-[32px] font-semibold text-text-title">
            About your salon
          </p>
          <p className="mb-[48px] text-center text-mango-text-gray-2">
            Tell us about your salon
          </p>
          <form className="mt-6 flex flex-wrap justify-center gap-2">
            <div className="relative flex h-[186px] w-[186px] items-center justify-center rounded-full bg-[#F2F2F5] border border-{#CBCBDB}">
              {selectedImage ? (
                <Image
                  src={
                    selectedImage
                      ? `${URL.createObjectURL(selectedImage)}`
                      : '/assets/images/SetupStore/image.svg'
                  }
                  alt="logo"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              ) : (
                <Image
                  src="/assets/images/SetupStore/image.svg"
                  alt="logo"
                  width={45}
                  height={45}
                />
              )}

              <input
                className="absolute bottom-0 right-0 z-10 mb-0 h-[185px] w-[185px] cursor-pointer opacity-0"
                accept="image/*"
                onChange={imageChange}
                type="file"
                id="imageUpload"
              />
              <div className="absolute bottom-0 right-0 mb-0 flex h-[59px] w-[59px] items-center justify-center rounded-full bg-[#00BDD6]">
                <Image
                  src="/assets/images/SetupStore/picture.svg"
                  alt="logo"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <p className="w-full pt-[16px] text-center text-mango-text-gray-2 ">
              Upload your salon profile picture
            </p>
            <div className="mb-1 mt-[36px] h-[56px] w-full">
              {/* <input
              className={`h-full w-full rounded border border-mango-gray-light-3 pl-4 text-left text-[16px] placeholder:text-mango-text-gray-2
              `}
              placeholder="Your business name"
            /> */}
              <TextField
                id="outlined-basic"
                label="Your salon name"
                variant="outlined"
                className="mb-2 w-full"
                sx={{
                  '& .MuiInputBase-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: '#00BDD6',
                    },
                  },
                  '& label.Mui-focused': {
                    color: '#00BDD6',
                  },
                }}
              />
            </div>
            <div className="flex w-full justify-between">
              <TextField
                disabled
                className="w-[128px] bg-[#F2F2F2]"
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#404044',
                    fontWeight: '600',
                    fontSize: '16px',
                  },
                }}
                id="input-with-icon-textfield"
                label="Prefix"
                defaultValue="(+1)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        loading="lazy"
                        width="20"
                        src="/assets/images/SetupStore/US.png"
                        alt=""
                        className="mr-1"
                      />
                      <Divider
                        className="mr-10"
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <div className="h-[56px] w-[352px] ">
                <TextField
                  sx={{
                    '& .MuiInputBase-root.Mui-focused': {
                      '& > fieldset': {
                        borderColor: '#00BDD6',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#00BDD6',
                    },
                  }}
                  id="outlined-basic"
                  label="Phone number"
                  variant="outlined"
                  className="w-full font-[16px] text-[#404044]"
                />
              </div>
            </div>
          </form>
          <Button
            className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize hover:bg-[#00ADC3]"
            variant="contained"
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutYourBusiness;
