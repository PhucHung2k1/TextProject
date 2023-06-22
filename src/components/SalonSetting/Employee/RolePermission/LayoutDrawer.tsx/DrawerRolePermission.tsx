import React, { useState } from 'react';
import AddRoleAndPermission from '../AddRoleAndPermission';
import SetAccessibility from '../SetAccessibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';
import { LayoutDrawer } from '.';
import EditRolePermission from '../EditRolePermission';
import { DrawerCustom } from '@/common/Drawer/DrawerCustom';

const steps = [
  {
    step: 0,
    titleHeader: 'Role & Permission',
    iconHeader: <CloseIcon fontSize="large" />,
    component: <AddRoleAndPermission />,
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
    component: <EditRolePermission />,
  },
];
export const DrawerRolePermission = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const curStep = steps.find((item) => item.step === activeStep);
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <DrawerCustom
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
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
