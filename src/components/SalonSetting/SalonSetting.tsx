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
      image: '/assets/images/SalonSetting/store-profile-icon.svg',
      image1: '/assets/images/SalonSetting/store-profile1-icon.svg',
      selected: true,
      component: <></>,
    },
    {
      id: 'configuration',
      name: 'Configuration',
      image: '/assets/images/SalonSetting/configuration-icon.svg',
      image1: '/assets/images/SalonSetting/configuration1-icon.svg',
      selected: false,
      component: <ConfigurationSetting />,
    },
    {
      id: 'menu',
      name: 'Menu',
      image: '/assets/images/SalonSetting/menu-icon.svg',
      image1: '/assets/images/SalonSetting/menu1-icon.svg',
      selected: false,
      component: <></>,
    },

    {
      id: 'team',
      name: 'Team',
      image: '/assets/images/SalonSetting/employee-icon.svg',
      image1: '/assets/images/SalonSetting/employee1-icon.svg',
      selected: false,
      component: <EmployeeSetting />,
    },
    {
      id: 'workSchedule',
      name: 'Work Schedule',
      image: '/assets/images/SalonSetting/work-schedule-icon.svg',
      image1: '/assets/images/SalonSetting/work-schedule1-icon.svg',
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
        }  min-h-[1200px] bg-mango-gray-light-5 p-2 shadow-mango-shadow-1`}
        style={{ transition: '0.3s ease-in' }}
      >
        <Button
          variant="text"
          onClick={handleChangeSlideBar}
          className="mb-6 flex h-[50px] w-full cursor-pointer rounded-[5px] !bg-white px-[10px] py-[15px] shadow-md"
        >
          {isClosedSlideBar && (
            <h2 className="my-auto truncate text-left text-[18px] font-extrabold uppercase leading-[18px] text-mango-text-black-1">
              SALON SETTINGS
            </h2>
          )}
          {!isClosedSlideBar ? (
            <ArrowBackIosNewIcon />
          ) : (
            <ArrowForwardIosIcon />
          )}
        </Button>
        {/* List Feature */}
        {listFeature.map((item) => (
          <Button
            variant="text"
            onClick={() => handleSelectedListFeature(item.id)}
            sx={{
              mt: 2,
            }}
            // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
            className={`${
              item.selected
                ? ' bg-primary-main bg-opacity-20 !text-primary-main '
                : ' text-mango-text-gray-2 hover:!bg-[#00BED630]'
            } ${
              isClosedSlideBar && 'justify-start'
            } flex h-14 w-full cursor-pointer rounded-[5px] p-2`}
            key={item.id}
          >
            <Image
              src={item.selected ? item.image1 : item.image}
              className={` ${!isClosedSlideBar && 'm-auto'} `}
              width={24}
              height={24}
              alt="logo"
            />
            {isClosedSlideBar && (
              <span
                className={`ml-2 truncate text-[16px] font-bold capitalize ${
                  item.selected && 'text-mango-primary-blue'
                }`}
              >
                {item.name}
              </span>
            )}
          </Button>
        ))}
      </div>
      {/* Right Content  */}
      <div className="h-full min-h-screen w-full overflow-auto bg-white px-12 py-2">
        {listFeature.find((feature) => feature.selected)?.component}
      </div>
    </div>
  );
};
