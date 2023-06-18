import { Button, TextField, InputAdornment, Divider, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hook';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import { useForm } from 'react-hook-form';
import { handleForwardProgressSetupStore } from './helper';
import { getStoreCustomer } from '@/store/store/storeAction';

interface IFormInput {
  ProfilePictureUrl: string;
  Name: string;
  PhoneNumber: string;
}

const AboutYourBusiness = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-console

  const [selectedImage, setSelectedImage] = useState<Blob>();
  // const [progress, setProgress] = useState<number>(0);
  const { register } = useForm<IFormInput>();
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // const onSubmit = async (values: IFormInput) => {
  //   dispatch(updateStoreProfile(values)).then(
  //     (res) => {
  //       const responseData = res.payload;
  //       // if (responseData?.status === 200) {
  //       router.push(
  //         {
  //           pathname: '/Name',
  //           query: {
  //             name: values.Name,
  //             PhoneNumber: values.PhoneNumber,
  //             ProfilePictureUrl: values.ProfilePictureUrl,
  //           },
  //         },
  //         '/Name'
  //       );
  //     }
  //     // }
  //   );
  // };
  useEffect(() => {
    dispatch(getStoreCustomer({}));
  }, []);

  return (
    <LayoutStoreProfile>
      <p className="mb-[8px] mt-[16px] text-center text-[32px] font-semibold text-text-title">
        About your salon
      </p>
      <p className="mb-[48px] text-center text-[14px] text-mango-text-gray-2">
        Tell us about your salon
      </p>
      <form className="mt-6 flex flex-wrap justify-center gap-2" noValidate>
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
          <TextField
            id="outlined-basic"
            label="Your salon name"
            variant="outlined"
            className="mb-2 w-full"
            {...register('Name', {})}
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
            {...register('PhoneNumber', {})}
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
                  <Box className="h-5 w-5">
                    <Image
                      loading="lazy"
                      width={20}
                      height={20}
                      src="/assets/images/SetupStore/US.png"
                      alt=""
                    />
                  </Box>
                  <Divider
                    className="mr-4"
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
        <Button
          className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize hover:bg-[#00ADC3]"
          variant="contained"
          type="submit"
          onClick={() => handleForwardProgressSetupStore(dispatch)}
        >
          CONTINUE
        </Button>
      </form>
    </LayoutStoreProfile>
  );
};

export default AboutYourBusiness;
