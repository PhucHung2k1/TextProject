/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { Box, Grid, Switch, styled } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { IEmployee } from './EmployeeList';
import { apiPostPhoto } from '@/utils/axios/instance';
// eslint-disable-next-line import/no-cycle
import { AntTab, StyledTabs } from '..';
import EmployeeProfileTab from './EditEmployeeTab/EmployeeProfileTab';
// import RoleAndPermissionTab from './RoleAndPermissionTab/RoleAndPermissionTab';
// import StoreWorkingHoursSetup from '@/components/StoreProfile/StoreWorkingHoursSetup';

const itemsTab = [
  {
    id: 0,
    label: 'EMPLOYEE PROFILE ',
    key: 'employeeList',
    children: <EmployeeProfileTab />,
  },
  {
    id: 1,
    label: 'WORK SCHEDULE',
    key: 'rolePermissions',
    children: <></>,
  },

  {
    id: 2,
    label: 'ROLE & PERMISSION',
    key: 'payStructure',
    children: <></>,
  },
  {
    id: 4,
    label: 'PAY STRUCTURE ',
    key: 'serviceProduct',
    children: <></>,
  },
  {
    id: 5,
    label: 'SERVICE & PRODUCT ',
    key: 'serviceProduct',
    children: <></>,
  },
];
const GreenSwitch = styled(Switch)({
  '& .MuiSwitch-track': {
    backgroundColor: '#69B00052',
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#69B000',
  },
});
const POST_IMAGE = '/file/upload-picture';
interface EditEmployeeProps {
  handleCloseDrawer: any;
  selectedEmployee: IEmployee | undefined;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({
  handleCloseDrawer,
  selectedEmployee,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [activeKey, setActiveKey] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [avatarImage, setAvatarImage] = useState<any>();
  // eslint-disable-next-line no-console
  console.log(avatarImage);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const uploadImage = async (imageFile: File): Promise<void> => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('File', imageFile);
        const res = await apiPostPhoto(POST_IMAGE, formData);
        return res.data;
      } catch (error) {
        // eslint-disable-next-line no-console
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

  return (
    <Grid container spacing={2} className=" w-[796px] bg-white p-8">
      <Grid xs={12} item>
        <div className="relative flex items-center justify-center text-3xl font-semibold text-text-title">
          <p>Edit Employee</p>
          <div
            onClick={handleCloseDrawer}
            className="absolute left-0  cursor-pointer text-icon-color"
          >
            <CloseIcon fontSize="large" />
          </div>
        </div>
      </Grid>
      <Grid xs={12} item>
        <form className=" mt-6 flex flex-wrap justify-center gap-2" noValidate>
          <div className="relative flex w-full flex-col items-center justify-center">
            <div className="relative flex h-[186px] w-[186px] items-center justify-center rounded-full border border-{#CBCBDB}">
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
                    selectedEmployee?.image !== ''
                      ? selectedEmployee?.image
                      : '/assets/images/StoreProfile/store-default.png'
                  }
                  alt="logo1"
                  width={186}
                  height={186}
                  className={
                    selectedEmployee?.image !== ''
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
              Upload employee's profile picture
            </p>

            <div className="absolute right-6 top-0 text-primary-dark">
              <GreenSwitch checked={checked} onChange={handleChange} />
              {checked ? 'Active' : 'Inactive'}
            </div>
          </div>
        </form>
      </Grid>
      <Grid xs={12} item>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs value={activeKey} onChange={handleChangeTab}>
              {itemsTab.map((item) => (
                <AntTab key={item.key} label={item.label} />
              ))}
            </StyledTabs>
          </Box>
          {itemsTab.map((item) => {
            return item.id === activeKey ? (
              <div key={item.key}>{item.children}</div>
            ) : (
              <></>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditEmployee;
