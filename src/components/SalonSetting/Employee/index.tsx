import { Box } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import PayStructure from './PayStructure/PayStructure';
import { StyledTabs, AntTab } from '../ConfigurationSetting';
import EmployeeList from './EmployeeList/EmployeeList';
import RolePermissionList from './RolePermission/ListRolePermission';

export const EmployeeSetting = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const items = [
    {
      id: 0,
      label: 'EMPLOYEE LIST',
      key: 'employeeList',
      children: <EmployeeList />,
    },
    {
      id: 1,
      label: 'ROLE & PERMISSION',
      key: 'rolePermissions',
      children: <RolePermissionList />,
    },

    {
      id: 2,
      label: 'PAY STRUCTURE',
      key: 'payStructure',
      children: <PayStructure />,
    },
    {
      id: 3,
      label: 'SERVICE & PRODUCT',
      key: 'serviceProduct',
      children: <></>,
    },
  ];

  return (
    <Box className="h-full w-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={activeKey} onChange={handleChange}>
          {items.map((item) => (
            <AntTab key={item.key} label={item.label} />
          ))}
        </StyledTabs>
      </Box>
      <Box className="overflow-auto">
        {items.find((item) => item.id === activeKey)?.children}
      </Box>
    </Box>
  );
};
