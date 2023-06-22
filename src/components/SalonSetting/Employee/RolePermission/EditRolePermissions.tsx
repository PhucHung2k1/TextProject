import { Box } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import AddRoleAndPermission from './AddRoleAndPermission';
import { AntTab, StyledTabs } from '..';
import SetAccessibility from './SetAccessibility';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  getListRoleCustomById,
  getRoleDetailById,
} from '@/store/customerRole/customerRoleAction';

const EditRolePermissions = () => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const dispatch = useAppDispatch();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };
  const addNewRoleId = useAppSelector(
    (state) => state.customerRoleSlice.addNewRoleId
  );
  const detailRoleById = useAppSelector(
    (state) => state.customerRoleSlice.detailRoleById
  );
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
  React.useEffect(() => {
    dispatch(getRoleDetailById(addNewRoleId));
    dispatch(getListRoleCustomById(addNewRoleId));
  }, []);
  return (
    <>
      <AddRoleAndPermission
        roleName={detailRoleById.Name}
        setRoleName={() => {}}
      />
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
