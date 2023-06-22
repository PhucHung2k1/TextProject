import { Box } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import AddRoleAndPermission from './AddRoleAndPermission';
import { AntTab, StyledTabs } from '..';
import SetAccessibility from './SetAccessibility';

interface Props {
  roleName: string;
}
const EditRolePermissions = ({ roleName }: Props) => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const items = [
    // {
    //   id: 0,
    //   label: 'ASSIGN EMPLOYEE',
    //   key: 'assignEmployee',

    //   children: <AssignEmployee />,
    // },
    {
      id: 0,
      label: 'ACCESSIBILITY',
      key: 'accessability',
      children: <SetAccessibility />,
    },
  ];

  return (
    <>
      <AddRoleAndPermission roleName={roleName} setRoleName={() => {}} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={activeKey} onChange={handleChange}>
            {items.map((item) => (
              <AntTab key={item.key} label={item.label} />
            ))}
          </StyledTabs>
        </Box>
        <Box>{items.find((item) => item.id === activeKey)?.children}</Box>
      </Box>
    </>
  );
};

export default EditRolePermissions;
