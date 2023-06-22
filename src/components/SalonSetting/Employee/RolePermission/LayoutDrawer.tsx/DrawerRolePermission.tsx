import React, { useState } from 'react';
import AddRoleAndPermission from '../AddRoleAndPermission';
import SetAccessibility from '../SetAccessibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';

import { DrawerCustom } from '@/common/Drawer/DrawerCustom';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { hideDrawerRolePermission } from '@/store/common/commonSlice';
import LayoutDrawer from '.';
import EditRolePermissions from '../EditRolePermissions';
import { addNewRole } from '@/store/customerRole/customerRoleAction';

const DrawerRolePermission = () => {
  const [roleName, setRoleName] = useState('');
  const dispatch = useAppDispatch();
  const openDrawerRolePermission = useAppSelector(
    (state) => state.commonSlice.openDrawerRolePermission
  );
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = [
    {
      step: 0,
      titleHeader: 'Role & Permission',
      iconHeader: <CloseIcon fontSize="large" />,
      component: (
        <AddRoleAndPermission roleName={roleName} setRoleName={setRoleName} />
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
      titleHeader: 'Edit & Permission',
      component: <EditRolePermissions roleName={roleName} />,
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
      roleName.length > 0 && dispatch(addNewRole({ name: roleName }));
    }
    // if(activeStep==steps)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DrawerCustom
      onClose={handleCloseDrawer}
      openDrawer={openDrawerRolePermission}
      content={
        <LayoutDrawer
          content={curStep?.component}
          iconHeader={curStep?.iconHeader}
          titleHeader={curStep?.titleHeader || ''}
          handleBack={activeStep === 0 ? handleCloseDrawer : handleBack}
          handleNext={handleNext}
          activeStep={activeStep}
          steps={steps}
        />
      }
    />
  );
};
export default DrawerRolePermission;
