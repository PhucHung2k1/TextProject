import { sxTextField } from '@/utils/helper/styles';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormControlComponent from '@/common/Input/FormControlComponent';

interface Props {
  setPayStructureData: Function;
}
const CheckCardPercentage = ({ setPayStructureData }: Props) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [checkCashPercentage, setCheckCashPercentage] = useState({
    TipFeeCheckPercentage: 0,
    SurchargeCheckPercentage: 0,
  });
  const handleChangeValue = (value: boolean | string, name: string) => {
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
            <FormControlComponent
              sx={sxTextField}
              type="number"
              label="Tip"
              value={checkCashPercentage.TipFeeCheckPercentage}
              className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              onChange={(e: any) =>
                handleChangeValue(e.target.value, 'TipFeeCheckPercentage')
              }
              name="TipFeeCheckPercentage"
              startIconInputProps="percent"
            />
          </Grid>

          <Grid xs={6} item>
            <FormControlComponent
              name="SurchargeCheckPercentage"
              sx={sxTextField}
              type="number"
              label="Surcharge"
              startIconInputProps="percent"
              value={checkCashPercentage.SurchargeCheckPercentage}
              onChange={(e: any) =>
                handleChangeValue(e.target.value, 'SurchargeCheckPercentage')
              }
              className="!rounded-sm border border-mango-text-gray-1 !outline-none"
            />
          </Grid>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default CheckCardPercentage;
