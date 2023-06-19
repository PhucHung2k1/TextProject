import { Box, Tab, styled } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useState } from 'react';
import RolePermissionList from './RolePermission/ListRolePermission';
interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    // eslint-disable-next-line tailwindcss/no-custom-classname
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    color: '#00BED6',
    backgroundColor: '#00BED6',
  },
});
export const EmployeeSetting = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const items = [
    {
      id: 0,
      label: <span>EMPLOYEE LIST</span>,
      key: 'employeeList',
      children: <></>,
    },
    {
      id: 1,
      label: <span>ROLE & PERMISSION</span>,
      key: 'rolePermissions',
      children: <RolePermissionList />,
    },

    {
      id: 2,
      label: <span>PAY STRUCTURE</span>,
      key: 'payStructure',
      children: <></>,
    },
    {
      id: 3,
      label: <span>SERVICE & PRODUCT</span>,
      key: 'serviceProduct',
      children: <></>,
    },
  ];

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={activeKey} onChange={handleChange}>
            {items.map((item) => (
              <Tab
                key={item.key}
                label={item.label}
                className="text-xl font-bold"
              />
            ))}
          </StyledTabs>
        </Box>
        {items.map((item) => {
          return item.id === activeKey ? (
            <div key={item.key}>{item.children}</div>
          ) : (
            <></>
          );
        })}
      </Box>
    </>
  );
};
