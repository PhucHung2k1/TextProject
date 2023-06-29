import { Grid, Stack, Divider, Box, Button } from '@mui/material';
import React, { useState } from 'react';
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

export interface IFormInputPayStructure {
  Name: string;
}
interface FormAddPayStructureProps {
  handleCloseDrawer: Function;
}

const FormAddPayStructure = ({
  handleCloseDrawer,
}: FormAddPayStructureProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputPayStructure>();

  const [payStructureData, setPayStructureData] = useState({
    PayStructure: {
      Name: '',
    },
    PayStructureConfiguration: {
      PayStructureSettings: {},
      TipOnCC: {},
      DailySurcharge: {},
      ProductCharge: {},
      ProductCommission: {},
      HoldCash: {},
      CheckCashPercentage: {},
    },
  });
  console.log('payStructureData', payStructureData);

  const onSubmit = async (_values: IFormInputPayStructure) => {
    setPayStructureData((prev) => ({
      ...prev,
      PayStructure: {
        Name: _values.Name,
      },
    }));
  };

  return (
    <div className=" min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="my-8" noValidate>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <FormControlComponent
              label="Pay Structure Group Name"
              sx={sxTextField}
              type="text"
              name="Name"
              error={Boolean(errors.Name)}
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
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Button bottom */}
          <Grid xs={12} item>
            <Stack direction="row" spacing={2}>
              <Grid xs={6} item>
                <Box
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border
                 border-border-secondary bg-white px-3 text-base font-semibold text-text-secondary"
                  onClick={() => handleCloseDrawer()}
                >
                  CANCEL
                </Box>
              </Grid>
              <Grid xs={6} item>
                <Button
                  type="submit"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base font-semibold  text-white"
                >
                  SAVE
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormAddPayStructure;
