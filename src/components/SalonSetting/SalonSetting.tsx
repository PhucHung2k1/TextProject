import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import { ConfigurationSetting } from './ConfigurationSetting';
import Image from 'next/image';
import { EmployeeSetting } from './Employee';

export const SalonSettingComponent = () => {
  const [isClosedSlideBar, setIsClosedSlideBar] = useState<boolean>(true);

  const [listFeature, setListFeature] = React.useState([
    {
      id: 'storeProfile',
      name: 'Store Profile',
      image: '/assets/images/SalonSetting/setting-1.svg',
      image1: '/assets/images/SalonSetting/5.svg',
      selected: true,
      component: <></>,
    },
    {
      id: 'configuration',
      name: 'Configuration',
      image: '/assets/images/SalonSetting/setting-1.svg',
      image1: '/assets/images/SalonSetting/5.svg',
      selected: false,
      component: <ConfigurationSetting />,
    },
    {
      id: 'menu',
      name: 'Menu',
      image: '/assets/images/SalonSetting/setting-1.svg',
      image1: '/assets/images/SalonSetting/5.svg',
      selected: false,
      component: <></>,
    },

    {
      id: 'employee',
      name: 'Employee',
      image: '/assets/images/SalonSetting/setting-1.svg',
      image1: '/assets/images/SalonSetting/5.svg',
      selected: false,
      component: <EmployeeSetting />,
    },
    {
      id: 'workSchedule',
      name: 'Work Schedule',
      image: '/assets/images/SalonSetting/setting-1.svg',
      image1: '/assets/images/SalonSetting/5.svg',
      selected: false,
      component: <></>,
    },
  ]);
  const handleSelectedListFeature = (value: any) => {
    setListFeature(
      listFeature.map((item) => {
        return {
          ...item,
          selected: item.id === value,
        };
      })
    );
  };
  const handleChangeSlideBar = () => {
    setIsClosedSlideBar(!isClosedSlideBar);
  };

  return (
    <div className="flex h-full w-full">
      {/* Left Content Side Bar */}

      <div
        className={`${
          isClosedSlideBar ? 'w-[288px]' : 'w-[100px]'
        }  h-full bg-[#EAEDF1] p-2`}
        style={{ transition: '0.3s ease-in' }}
      >
        <Button
          variant="text"
          onClick={handleChangeSlideBar}
          endIcon={
            !isClosedSlideBar ? (
              <ArrowBackIosNewIcon />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
          className="mb-6 flex h-[50px] w-full cursor-pointer rounded-[5px] !bg-white px-[10px] py-[15px] shadow-md"
        >
          {isClosedSlideBar && (
            <h2 className="my-auto truncate text-left text-[18px] font-extrabold uppercase leading-[18px] text-mango-text-black-1">
              SALON SETTINGS
            </h2>
          )}
        </Button>
        {/* List Feature */}
        {listFeature.map((item) => (
          <Button
            variant="text"
            onClick={() => handleSelectedListFeature(item.id)}
            sx={{ mt: 2, color: 'white' }}
            className={`${
              item.selected
                ? '!bg-mango-primary-blue text-white shadow-md'
                : ' text-mango-text-gray-2 hover:!bg-[#00BED630]'
            } flex w-full cursor-pointer justify-start rounded-[5px] p-2`}
            key={item.id}
          >
            <Image
              src={item.selected ? item.image : item.image1}
              className={`h-6 ${!isClosedSlideBar && 'm-auto'} `}
              width={24}
              height={24}
              alt="logo"
            />
            {isClosedSlideBar && (
              <span
                className={` ml-2 truncate text-[16px] font-bold capitalize`}
              >
                {item.name}
              </span>
            )}
          </Button>
        ))}
      </div>
      {/* Right Content  */}
      <div className="h-full w-full px-12 py-2 ">
        {listFeature.find((feature) => feature.selected)?.component}
      </div>
    </div>
  );
};