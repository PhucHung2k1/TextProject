import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';

import { DrawerCustom } from '@/common/Drawer/DrawerCustom';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { hideDrawerPayStructure } from '@/store/common/commonSlice';
import LayoutDrawer from '../../../../../common/LayoutDrawer';

import { useRouter } from 'next/router';
import type { ISteps } from '../../RolePermission/LayoutDrawer.tsx/DrawerRolePermission';
import FormAddPayStructure from './FormAddPayStructure';
import {
  addPayStructure,
  addRemoveMultiPayStructureEmployee,
} from '@/store/payStructure/payStructureAction';
import AssignEmployeePayStructure from './AssignEmployeePayStructure';

export interface IStepsPayStructure {
  step: number;
  iconHeader: ReactNode;
  titleHeader: string;
  component: ReactNode;
}

const DrawerPayStructure = () => {
  const route = useRouter();

  const dispatch = useAppDispatch();
  const openDrawerPayStructure = useAppSelector(
    (state) => state.commonSlice.openDrawerPayStructure
  );
  const payloadAddPayStructure = useAppSelector(
    (state) => state.payStructureSlice.payloadAddPayStructure
  );
  const payLoadAssignPayStructureEmployee = useAppSelector(
    (state) => state.payStructureSlice.addRemoveMultiPayStructureEmployee
  );
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const handleCloseDrawer = () => {
    dispatch(hideDrawerPayStructure());
  };
  const steps: ISteps[] = [
    {
      step: 0,
      titleHeader: 'Add Pay Structure',
      iconHeader: <CloseIcon fontSize="large" />,
      component: <FormAddPayStructure />,
    },
  ];
  if (route.pathname !== '/store-profile')
    steps.push({
      step: 1,
      iconHeader: (
        <ArrowBackIcon className="cursor-pointer text-3xl text-icon-color" />
      ),
      titleHeader: 'Assign Employee',
      component: <AssignEmployeePayStructure />,
    });
  const curStep = steps.find((item) => item.step === activeStep);
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    const newSkipped = skipped;

    const removeActiveStepFromSkipped = () => {
      if (isStepSkipped(activeStep)) {
        newSkipped.delete(activeStep);
      }
    };

    const handleStep0 = async () => {
      if (activeStep !== 0) return;
      // if (roleName.length === 0) return;
      try {
        const res = await dispatch(addPayStructure(payloadAddPayStructure));
        const result: any = res.payload;
        if (result?.status >= 200 && result?.status < 300) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleStep1 = async () => {
      if (activeStep !== 1) return;
      try {
        const res = await dispatch(
          addRemoveMultiPayStructureEmployee(payLoadAssignPayStructureEmployee)
        );
        const result: any = res.payload;
        if (result?.status >= 200 && result?.status < 300) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleLastStep = () => {
      if (activeStep >= steps.length - 1) {
        dispatch(hideDrawerPayStructure());
      }
    };

    removeActiveStepFromSkipped();
    await handleStep0();
    await handleStep1();
    handleLastStep();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    // Set default data
    if (openDrawerPayStructure) {
      setActiveStep(0);
    }
  }, [openDrawerPayStructure]);
  return (
    <DrawerCustom
      onClose={handleCloseDrawer}
      openDrawer={openDrawerPayStructure}
      content={
        <LayoutDrawer
          content={curStep?.component}
          iconHeader={curStep?.iconHeader}
          titleHeader={curStep?.titleHeader || ''}
          handleCloseDrawer={handleCloseDrawer}
          handleBack={activeStep === 0 ? handleCloseDrawer : handleBack}
          handleNext={handleNext}
          activeStep={activeStep}
          disable={false}
          steps={steps}
        />
      }
    />
  );
};
export default DrawerPayStructure;
