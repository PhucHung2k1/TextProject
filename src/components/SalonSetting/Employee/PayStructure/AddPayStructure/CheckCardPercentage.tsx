import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputTwoValue from '@/common/Input/InputTwoValue';
import type { CheckCashPercentage } from '@/services/payStructure.service/payStructure.interface';

interface Props {
  checkCashPercentageData: CheckCashPercentage;
  setPayStructureData: Function;
}
const CheckCardPercentage = ({
  checkCashPercentageData,
  setPayStructureData,
}: Props) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [checkCashPercentage, setCheckCashPercentage] =
    useState<CheckCashPercentage>(checkCashPercentageData);
  const handleChangeValue = (
    value: boolean | string | number,
    name: string
  ) => {
    setCheckCashPercentage((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prevState: any) => ({
      ...prevState,
      Configuration: {
        ...prevState.Configuration,
        CheckCashPercentage: checkCashPercentage,
      },
    }));
  }, [checkCashPercentage]);
  return (
    <Grid xs={12} item>
      <Stack direction="column" spacing={2}>
        <div className="text-2xl font-semibold text-text-title">
          Check/ Cash percentage
        </div>

        <Stack direction="row" spacing={2} className="w-full">
          <Grid xs={6} item>
            <InputTwoValue
              label="Tip"
              value={checkCashPercentage.TipFeeCheckPercentage}
              setValue={(value: number) =>
                handleChangeValue(value, 'TipFeeCheckPercentage')
              }
            />
          </Grid>

          <Grid xs={6} item>
            <InputTwoValue
              label="Surcharge"
              value={checkCashPercentage.SurchargeCheckPercentage}
              setValue={(value: number) =>
                handleChangeValue(value, 'SurchargeCheckPercentage')
              }
            />
          </Grid>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default CheckCardPercentage;
