import {
  Button,
  TextField,
  InputAdornment,
  Divider,
  Box,
  FormControl,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getStoreCustomer } from '@/store/store/storeAction';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import { handleForwardProgressSetupStore } from './helper';
import { apiPostPhoto } from '@/utils/axios/instance';
import { Store } from '@/services/store.service/store.service';
import type { IStoreProfile } from '@/services/store.service/store.interface';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { sxTextField, sxDisableTextField } from '@/utils/helper/styles';

const POST_IMAGE = '/file/upload-picture';

const AboutYourBusiness = () => {
  const dispatch = useAppDispatch();

  const curStoreCustomerId = Cookies.get('store-customer');
  const curStoreCustomer = useAppSelector(
    (state) => state.storeSlice.storeCustomer
  ).find((store) => store.Id === curStoreCustomerId);

  const [selectedImage, setSelectedImage] = useState<any>();
  const [avatarImage, setAvatarImage] = useState<any>();
  const [formStore, setFormStore] = useState({
    Id: curStoreCustomer?.Id || '',
    Name: curStoreCustomer?.Name || '',
    PhoneNumber: curStoreCustomer?.PhoneNumber || '',
    ProfilePictureUrl: curStoreCustomer?.ProfilePictureUrl || '',
  });

  const {
    // register,
    // formState: { errors },
    handleSubmit,
  } = useForm<IStoreProfile>();

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

  const submitForm = async () => {
    const storeAPI = new Store();
    try {
      const patchData = [];

      if (formStore.Name !== curStoreCustomer?.Name) {
        patchData.push({
          op: 'replace',
          path: '/Name',
          value: formStore.Name,
        });
      }
      if (formStore.PhoneNumber !== curStoreCustomer?.PhoneNumber) {
        patchData.push({
          op: 'replace',
          path: '/PhoneNumber',
          value: formStore.PhoneNumber,
        });
      }
      if (
        avatarImage &&
        avatarImage.OriginalPublishUrl !== curStoreCustomer?.ProfilePictureUrl
      ) {
        patchData.push({
          op: 'replace',
          path: '/ProfilePictureUrl',
          value: avatarImage.OriginalPublishUrl,
        });
      }
      if (patchData.length > 0) {
        await storeAPI.updateStore(formStore.Id, patchData);
      }

      handleForwardProgressSetupStore(dispatch);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(getStoreCustomer({}));
    if (curStoreCustomer) {
      setFormStore((prevFormStore) => ({
        ...prevFormStore,
        Name: curStoreCustomer.Name || '',
        PhoneNumber: curStoreCustomer.PhoneNumber || '',
        ProfilePictureUrl: curStoreCustomer.ProfilePictureUrl || '',
        Id: curStoreCustomer.Id || '',
      }));
    }
  }, [
    curStoreCustomer?.Name,
    curStoreCustomer?.PhoneNumber,
    curStoreCustomer?.ProfilePictureUrl,
  ]);
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
        onSubmit={handleSubmit(submitForm)}
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
                  : '/assets/images/StoreProfile/store-default.png'
              }
              alt="logo1"
              width={186}
              height={186}
              className={
                formStore.ProfilePictureUrl !== ''
                  ? 'rounded-full object-cover'
                  : 'rounded-full'
              }
            />
          )}

          <input
            className="absolute bottom-0 right-0 z-10 mb-0 h-[185px] w-[185px] cursor-pointer opacity-0"
            accept="image/*"
            onChange={handleFileImage}
            type="file"
            id="imageUpload"
          />
          <div className="absolute bottom-0 right-0 mb-0 flex h-[59px] w-[59px] items-center justify-center rounded-full bg-primary-main">
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
            sx={sxTextField}
            id="outlined-basic"
            label="Your salon name"
            variant="outlined"
            className="mb-2 w-full"
            value={formStore.Name}
            name="Name"
            onChange={handleFieldChange}
          />
        </div>
        <div className="flex w-full justify-between">
          <TextField
            disabled
            className="w-[128px] bg-[#F2F2F2]"
            sx={{ sxDisableTextField }}
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
          <div>
            <FormControl className="h-[56px] w-[352px] ">
              <TextField
                sx={sxTextField}
                value={formStore.PhoneNumber}
                // error={Boolean(errors.PhoneNumber)}
                // {...register('PhoneNumber', {
                //   required: 'Enter Your PhoneNumber!',
                // })}
                onChange={handleFieldChange}
                name="PhoneNumber"
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                className="w-full font-[16px] text-primary-dark"
              />
            </FormControl>
          </div>
        </div>
        <Button
          className="mt-12 h-12 w-full bg-mango-primary-blue  text-base font-bold capitalize text-white hover:bg-button-hover-cyan"
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
