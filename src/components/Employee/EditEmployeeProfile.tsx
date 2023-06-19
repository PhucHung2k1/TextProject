import type { NextPage } from 'next';
import {
  Button,
  TextField,
  InputAdornment,
  Divider,
  Box,
  FormControl,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import { apiPostPhoto } from '@/utils/axios/instance';
import { Clear } from '@mui/icons-material';

const POST_IMAGE = '/file/upload-picture';

const EditEmployeeProfile: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState<any>();
  const [avatarImage, setAvatarImage] = useState<any>();
  const [formStore, setFormStore] = useState({
    Id: '',
    Name: '',
    PhoneNumber: '',
    ProfilePictureUrl: '',
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

  return (
    <div className="relative w-[568px] h-[1800px] rounded-2xl bg-white shadow-md overflow-hidden">
      <div className="flex justify-center items-center bg-background-white w-full h-[1800px] text-left text-xs text-dimgray-100 font-components-avatar-initials">
        <div>
          <div className="flex items-center justify-center ">
            <Clear className="cursor-pointer text-3xl" />
            <p className="mx-auto text-center text-[32px] font-semibold text-text-title">
              Edit business hours
            </p>
          </div>

          <form className="mt-6 flex flex-wrap justify-center gap-2" noValidate>
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
              <div className="absolute bottom-0 right-0 mb-0 flex h-[59px] w-[59px] items-center justify-center rounded-full bg-[#00BDD6]">
                <Image
                  src="/assets/images/SetupStore/picture.svg"
                  alt="logo"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeProfile;
