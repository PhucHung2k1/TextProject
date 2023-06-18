import { Button, TextField, InputAdornment, Divider, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getStoreCustomer } from '@/store/store/storeAction';
import { LayoutStoreProfile } from './LayoutStoreProfile';

import { handleForwardProgressSetupStore } from './helper';
import { apiPostPhoto } from '@/utils/axios/instance';
import { Store } from '@/services/store.service/store.service';

const POST_IMAGE = '/file/upload-picture';

const AboutYourBusiness = () => {
  const dispatch = useAppDispatch();

  const storeCustomer = useAppSelector(
    (state) => state.storeSlice.storeCustomer
  );

  const [selectedImage, setSelectedImage] = useState<any>();

  const [avatarImage, setAvatarImage] = useState<any>();
  const [formStore, setFormStore] = useState({
    Id: storeCustomer[0]?.Id || '',
    Name: storeCustomer[0]?.Name || '',
    PhoneNumber: storeCustomer[0]?.PhoneNumber || '',
    ProfilePictureUrl: storeCustomer[0]?.ProfilePictureUrl || '',
  });

  const uploadImage = async (imageFile: File): Promise<void> => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('File', imageFile);
        const res = await apiPostPhoto(POST_IMAGE, formData);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleFileImage = async (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const responsive = await uploadImage(file);
    setAvatarImage(responsive);
  };
  const handleFieldChange = (e: any) => {
    setFormStore({
      ...formStore,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: any) => {
    // eslint-disable-next-line no-console
    console.log('submit');

    e.preventDefault();
    const storeAPI = new Store();

    try {
      const patchData = [
        { op: 'replace', path: '/Name', value: formStore.Name },
        { op: 'replace', path: '/PhoneNumber', value: formStore.PhoneNumber },
        {
          op: 'replace',
          path: '/ProfilePictureUrl',
          value: avatarImage.OriginalPublishUrl,
        },
      ];

      await storeAPI.updateStore(formStore.Id, patchData);
      handleForwardProgressSetupStore(dispatch);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(getStoreCustomer({}));
    if (storeCustomer) {
      setFormStore({
        Name: storeCustomer[0]?.Name || '',
        PhoneNumber: storeCustomer[0]?.PhoneNumber || '',
        ProfilePictureUrl: storeCustomer[0]?.ProfilePictureUrl || '',
        Id: storeCustomer[0]?.Id || '',
      });
    }
  }, [storeCustomer[0]?.Name]);

  return (
    <LayoutStoreProfile>
      <p className="mb-[8px] mt-[16px] text-center text-[32px] font-semibold text-text-title">
        About your salon
      </p>
      <p className="mb-[48px] text-center text-[14px] text-mango-text-gray-2">
        Tell us about your salon
      </p>
      <form
        className="mt-6 flex flex-wrap justify-center gap-2"
        noValidate
        onSubmit={submitForm}
      >
        <div className="relative flex h-[186px] w-[186px] items-center justify-center rounded-full bg-[#F2F2F5] border border-{#CBCBDB}">
          {selectedImage ? (
            <Image
              src={URL?.createObjectURL(selectedImage)}
              alt="logo"
              layout="fill"
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src={
                formStore.ProfilePictureUrl !== ''
                  ? formStore.ProfilePictureUrl
                  : '/assets/images/SetupStore/image.svg'
              }
              alt="logo"
              width={186}
              height={186}
            />
          )}

          <input
            className="absolute bottom-0 right-0 z-10 mb-0 h-[185px] w-[185px] cursor-pointer opacity-0"
            accept="image/*"
            onChange={handleFileImage}
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
            value={formStore.Name}
            name="Name"
            onChange={handleFieldChange}
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
              value={formStore.PhoneNumber}
              onChange={handleFieldChange}
              name="PhoneNumber"
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
          // onClick={() => handleForwardProgressSetupStore(dispatch)}
        >
          CONTINUE
        </Button>
      </form>
    </LayoutStoreProfile>
  );
};

export default AboutYourBusiness;
