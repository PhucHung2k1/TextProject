import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import AddRoleAndPermission from '../AddRoleAndPermission';
import SetAccessibility from '../SetAccessibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';

import { DrawerCustom } from '@/common/Drawer/DrawerCustom';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { hideDrawerRolePermission } from '@/store/common/commonSlice';
import LayoutDrawer from '.';
import {
  addNewRole,
  addRemoveMultiRole,
  getListRoleCustomById,
} from '@/store/customerRole/customerRoleAction';
import AssignEmployee from '../EditRolePermission';

export interface ISteps {
  step: number;
  iconHeader: ReactNode;
  titleHeader: string;
  component: ReactNode;
}
export interface IStateAddRole {
  isTechnician: boolean;
  takeAppointment: boolean;
  allowQuickPayment: boolean;
  availableBookingOnline: boolean;
}
const DrawerRolePermission = () => {
  const [roleName, setRoleName] = useState('');
  const [stateAddRole, setStateAddRole] = useState<IStateAddRole>({
    isTechnician: false,

    allowQuickPayment: false,
    takeAppointment: true,
    availableBookingOnline: false,
  });

  const dispatch = useAppDispatch();
  const openDrawerRolePermission = useAppSelector(
    (state) => state.commonSlice.openDrawerRolePermission
  );
  const idAddNewRole = useAppSelector(
    (state) => state.customerRoleSlice.addNewRoleId
  );
  const listPermissionAddRemove = useAppSelector(
    (state) => state.customerRoleSlice.addRemoveMultiRoleIds
  );
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps: ISteps[] = [
    {
      step: 0,
      titleHeader: 'Role & Permission',
      iconHeader: <CloseIcon fontSize="large" />,
      component: (
        <AddRoleAndPermission
          roleName={roleName}
          setRoleName={setRoleName}
          stateAddRole={stateAddRole}
          setStateAddRole={setStateAddRole}
        />
      ),
    },
    {
      step: 1,
      iconHeader: (
        <ArrowBackIcon className="cursor-pointer text-3xl text-icon-color" />
      ),
      titleHeader: 'Set Accessibility',
      component: <SetAccessibility />,
    },
    {
      step: 2,
      iconHeader: (
        <ArrowBackIcon className="cursor-pointer text-3xl text-icon-color" />
      ),
      titleHeader: 'Assign Employee',
      component: <AssignEmployee idRole={idAddNewRole} selected={[]} />,
    },
  ];
  const curStep = steps.find((item) => item.step === activeStep);
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleCloseDrawer = () => {
    dispatch(hideDrawerRolePermission());
  };
  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      roleName.length > 0 &&
        dispatch(
          addNewRole({
            name: roleName,
            allowQuickPayment: stateAddRole.allowQuickPayment,
            availableBookingOnline: stateAddRole.availableBookingOnline,
            isTechnician: stateAddRole.isTechnician,
            takeAppointment: stateAddRole.takeAppointment,
          })
        ).then((res) => {
          const result = res.payload;
          if (result?.status === 200 || result?.status === 201) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
          }
        });
    }
    if (activeStep === 1) {
      dispatch(
        addRemoveMultiRole({
          id: idAddNewRole,
          body: listPermissionAddRemove,
        })
      ).then((res) => {
        const result = res.payload;
        if (result?.status === 200 || result?.status === 201) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
      });
      dispatch(getListRoleCustomById(idAddNewRole));
    }

    if (activeStep > steps.length - 1) {
      dispatch(hideDrawerRolePermission());
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    // Set default data
    if (openDrawerRolePermission) {
      setActiveStep(0);
      setRoleName('');
      setStateAddRole({
        isTechnician: false,
        takeAppointment: true,
        allowQuickPayment: false,
        availableBookingOnline: false,
      });
    }
  }, [openDrawerRolePermission]);
  return (
    <DrawerCustom
      onClose={handleCloseDrawer}
      openDrawer={openDrawerRolePermission}
      content={
        <LayoutDrawer
          content={curStep?.component}
          iconHeader={curStep?.iconHeader}
          titleHeader={curStep?.titleHeader || ''}
          handleCloseDrawer={handleCloseDrawer}
          handleBack={activeStep === 0 ? handleCloseDrawer : handleBack}
          handleNext={handleNext}
          activeStep={activeStep}
          disable={activeStep === 0 && roleName.length === 0}
          steps={steps}
        />
      }
    />
  );
};
export default DrawerRolePermission;
