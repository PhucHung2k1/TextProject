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

import { useAppDispatch } from '@/store/hook';
import { setPayloadAddPayStructure } from '@/store/payStructure/payStructureSlice';

export interface IFormInputPayStructure {
  Name: string;
}

const FormAddPayStructure = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputPayStructure>();

  const [payStructureData, setPayStructureData] = useState({
    PayStructure: {
      Name: '',
    },
    Configuration: {
      PayStructureSettings: {},
      TipOnCC: {},
      DailySurcharge: {},
      ProductCharge: {},
      ProductCommission: {},
      HoldCash: {},
      CheckCashPercentage: {},
    },
  });

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
            setPayStructureData={setPayStructureData}
          />

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Tip on cc */}
          <TipOnCCComponent setPayStructureData={setPayStructureData} />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Daily Surcharge */}
          <DailySurchargeComponent setPayStructureData={setPayStructureData} />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Charge */}
          <ProductChargeComponent setPayStructureData={setPayStructureData} />
          {/* Under line */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Commission */}
          <ProductCommissionComponent
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Allow Hold Cash */}
          <AllowHoldCash setPayStructureData={setPayStructureData} />
          {/* Divider */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Check/ Card percentage */}
          <CheckCardPercentage setPayStructureData={setPayStructureData} />
        </Grid>
      </form>
    </div>
  );
};

export default FormAddPayStructure;
