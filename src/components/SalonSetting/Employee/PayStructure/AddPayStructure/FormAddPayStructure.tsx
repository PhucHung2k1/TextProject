import { Grid, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sxTextField } from '@/utils/helper/styles';
import TipOnCCComponent from './TipOnCCComponent';
import DailySurchargeComponent from './DailySurchargeComponent';
import ProductChargeComponent from './ProductChargeComponent';
import ProductCommissionComponent from './ProductCommissionComponent';
import PayStructureSettingComponent from './PayStructureSettingComponent';
import AllowHoldCash from './AllowHoldCash';
import CheckCardPercentage from './CheckCardPercentage';
import FormControlComponent from '@/common/Input/FormControlComponent';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setPayloadAddPayStructure } from '@/store/payStructure/payStructureSlice';
import { initAddPayStructure } from '@/utils/helper/initPayStructure';

export interface IFormInputPayStructure {
  Name: string;
}

const FormAddPayStructure = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputPayStructure>();
  const openDrawerPayStructure = useAppSelector(
    (state) => state.commonSlice.openDrawerPayStructure
  );
  const [payStructureData, setPayStructureData] = useState(initAddPayStructure);

  const handleChangeName = (Name: string) => {
    setPayStructureData((prev) => ({
      ...prev,
      PayStructure: {
        Name,
      },
    }));
  };
  useEffect(() => {
    dispatch(setPayloadAddPayStructure(payStructureData));
  }, [payStructureData]);
  useEffect(() => {
    if (openDrawerPayStructure) {
      setPayStructureData(initAddPayStructure);
    }
  }, [openDrawerPayStructure]);
  return (
    <div className=" min-h-screen">
      <form className="my-8" noValidate>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <FormControlComponent
              label="Pay Structure Group Name"
              sx={sxTextField}
              type="text"
              name="Name"
              error={Boolean(errors.Name)}
              onChange={(e: any) => handleChangeName(e.target.value)}
              errors={errors}
              requiredField={{
                ...register('Name', {
                  required: 'Enter Pay Struct Group Name!',
                }),
              }}
              required
              className="!rounded-sm border border-mango-text-gray-1 !outline-none"
            />
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Pay Structure settings */}
          <PayStructureSettingComponent
            payStructureSettingsData={
              payStructureData.Configuration.PayStructureSettings
            }
            setPayStructureData={setPayStructureData}
          />

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Tip on cc */}
          <TipOnCCComponent
            tipOnCCData={payStructureData.Configuration.TipOnCC}
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Daily Surcharge */}
          <DailySurchargeComponent
            dailySurchargeData={payStructureData.Configuration.DailySurcharge}
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Charge */}
          <ProductChargeComponent
            productChargeData={payStructureData.Configuration.ProductCharge}
            setPayStructureData={setPayStructureData}
          />
          {/* Under line */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Commission */}
          <ProductCommissionComponent
            productCommissionData={
              payStructureData.Configuration.ProductCommission
            }
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Allow Hold Cash */}
          <AllowHoldCash
            allowHoldCashData={payStructureData.Configuration.HoldCash}
            setPayStructureData={setPayStructureData}
          />
          {/* Divider */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Check/ Card percentage */}
          <CheckCardPercentage
            checkCashPercentageData={
              payStructureData.Configuration.CheckCashPercentage
            }
            setPayStructureData={setPayStructureData}
          />
        </Grid>
      </form>
    </div>
  );
};

export default FormAddPayStructure;
