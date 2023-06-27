import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import type { IPatchPayloadData } from '@/services/customerRole.service/customerRole.interface';
import {
  addRemoveMultiRole,
  addRemoveMultiRoleEmployee,
  updateRole,
} from '@/store/customerRole/customerRoleAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import AssignEmployees from './AssignEmployeesTab';
import AddRoleAndPermission from '../AddRoleAndPermission';
import type { IStateAddRole } from '../LayoutDrawer.tsx/DrawerRolePermission';
import SetAccessibility from '../SetAccessibility';
import LayoutDrawer from '../LayoutDrawer.tsx';
import {
  AntTab,
  StyledTabs,
} from '@/components/SalonSetting/ConfigurationSetting';

interface EditRolePermissionProps {
  idRole: any;

  handleCloseDrawer: any;
}
const EditRolePermission: React.FC<EditRolePermissionProps> = ({
  idRole,
  handleCloseDrawer,
}) => {
  const dispatch = useAppDispatch();
  const detailRoleById = useAppSelector(
    (state) => state.customerRoleSlice.detailRoleById
  );

  const itemsTab = [
    {
      id: 0,
      label: 'Assign Employee ',
      key: 'assignEmployee',
      children: <AssignEmployees idRole={idRole} />,
    },
    {
      id: 1,
      label: 'Accessability',
      key: 'accessability',
      children: <SetAccessibility />,
    },
  ];

  const [activeKey, setActiveKey] = React.useState<number>(0);
  const [roleName, setRoleName] = useState(detailRoleById?.Name || '');
  const [stateAddRole, setStateAddRole] = useState<IStateAddRole>({
    isTechnician: detailRoleById?.IsTechnician,
    allowQuickPayment: detailRoleById?.AllowQuickPayment,
    takeAppointment: detailRoleById?.TakeAppointment,
    availableBookingOnline: detailRoleById?.AvailableBookingOnline,
  });

  const listAddRemoveRolePermission = useAppSelector(
    (state) => state.customerRoleSlice.addRemoveMultiRoleEmployee
  );
  const listPermissionAddRemove = useAppSelector(
    (state) => state.customerRoleSlice.addRemoveMultiRoleIds
  );
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };
  useEffect(() => {
    setRoleName(detailRoleById.Name);
    setStateAddRole({
      isTechnician: detailRoleById?.IsTechnician,
      allowQuickPayment: detailRoleById?.AllowQuickPayment,
      takeAppointment: detailRoleById?.TakeAppointment,
      availableBookingOnline: detailRoleById?.AvailableBookingOnline,
    });
  }, [detailRoleById]);

  const handleOnSave = () => {
    const payload: IPatchPayloadData[] = [];

    const addPayload = (path: string, value: any) => {
      const currentDetailRoleValue = detailRoleById?.[path.substring(1)];
      if (value !== currentDetailRoleValue) {
        payload.push({ op: 'replace', path, value });
      }
    };

    addPayload('/Name', roleName);
    addPayload('/AllowQuickPayment', stateAddRole.allowQuickPayment);
    addPayload('/AvailableBookingOnline', stateAddRole.availableBookingOnline);
    addPayload('/IsTechnician', stateAddRole.isTechnician);
    addPayload('/TakeAppointment', stateAddRole.takeAppointment);

    const hasRolePayload = payload.length > 0;
    if (hasRolePayload) {
      dispatch(updateRole({ id: detailRoleById.Id, data: payload }));
    }

    const listPermissionAddRemovePayloadExists =
      listPermissionAddRemove.AddedPermissions.length > 0 ||
      listPermissionAddRemove.RemovedPermissions.length > 0;

    if (listPermissionAddRemovePayloadExists) {
      dispatch(
        addRemoveMultiRole({
          id: idRole,
          body: listPermissionAddRemove,
        })
      );
    }

    const listAddRemoveRolePermissionExists =
      listAddRemoveRolePermission.data.AddedEmployeeIds.length > 0 ||
      listAddRemoveRolePermission.data.RemovedEmployeeIds.length > 0;

    if (listAddRemoveRolePermissionExists) {
      dispatch(addRemoveMultiRoleEmployee(listAddRemoveRolePermission));
    }
  };
  return (
    <LayoutDrawer
      disable={false}
      showProgress={false}
      content={
        <>
          <AddRoleAndPermission
            roleName={roleName}
            setRoleName={setRoleName}
            setStateAddRole={setStateAddRole}
            stateAddRole={stateAddRole}
          />

          <Grid xs={12} item>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <StyledTabs value={activeKey} onChange={handleChangeTab}>
                  {itemsTab.map((item) => (
                    <AntTab key={item.key} label={item.label} />
                  ))}
                </StyledTabs>
              </Box>
              <div>
                {itemsTab.find((item) => item.id === activeKey)?.children}
              </div>
            </Box>
          </Grid>
        </>
      }
      handleBack={handleCloseDrawer}
      handleCloseDrawer={handleCloseDrawer}
      handleNext={handleOnSave}
      iconHeader={<CloseIcon fontSize="large" />}
      titleHeader="Edit Role & Permission"
    />
  );
};

export default EditRolePermission;
