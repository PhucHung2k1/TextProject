import FormControlComponent from '@/common/Input/FormControlComponent';
import { sxRadioBlue, sxTextField } from '@/utils/helper/styles';

import {
  Grid,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  setPayStructureData: Function;
}
const ProductChargeComponent = ({ setPayStructureData }: Props) => {
  const [productCharge, setProductCharge] = useState({
    ProductChargeType: 'Based on Service',
    BaseOnTicketAmount: 0,
    BaseOnTicketMinChargeAmount: 0,
    BaseOnTicketMinChargePercent: 0,
  });
  const handleChangeValue = (value: boolean | string, name: string) => {
    setProductCharge((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prev: any) => ({ ...prev, productCharge }));
  }, [productCharge]);
  return (
    <Grid xs={12} item className="">
      <Stack direction="column" spacing={2}>
        <div className="text-2xl font-semibold text-text-title">
          Product Charge
        </div>
        <RadioGroup
          row
          value={productCharge.ProductChargeType}
          onChange={(e) =>
            handleChangeValue(e.target.value, 'ProductChargeType')
          }
        >
          <Stack direction="column" spacing={0} className="w-full">
            <Grid xs={12} item>
              <FormControlLabel
                control={<Radio sx={sxRadioBlue} />}
                label="Based on Service (Menu Settings)"
                value="Based on Service"
              />
            </Grid>

            <Grid xs={12} item>
              <FormControlLabel
                control={<Radio sx={sxRadioBlue} />}
                label="Based on ticket"
                value="Based on ticket"
              />
            </Grid>
          </Stack>
          {/* Based on ticket Content Selected */}
          {productCharge.ProductChargeType === 'Based on ticket' && (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
                mt={2}
                width="100%"
              >
                <FormControlComponent
                  name="BaseOnTicketAmount"
                  startIconInputProps="money"
                  sx={sxTextField}
                  label="Min ticket amount"
                  type="number"
                  value={productCharge.BaseOnTicketAmount}
                  // className="!max-w-[50%] !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                />

                <FormControlLabel
                  label="Charge"
                  labelPlacement="start"
                  control={
                    <FormControlComponent
                      name="BaseOnTicketMinChargeAmount"
                      startIconInputProps="money"
                      sx={[sxTextField, { marginLeft: 2 }]}
                      type="number"
                      value={productCharge.BaseOnTicketMinChargeAmount}
                      // className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                    />
                  }
                />

                <FormControlLabel
                  label="OR"
                  className="text-tertiary"
                  labelPlacement="start"
                  control={
                    <FormControlComponent
                      name="BaseOnTicketMinChargeAmount"
                      sx={[sxTextField, { marginLeft: 2 }]}
                      type="number"
                      startIconInputProps="money"
                      value={productCharge.BaseOnTicketMinChargePercent}
                      // className="!w-40  !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                    />
                  }
                />
              </Stack>
            </>
          )}
        </RadioGroup>
      </Stack>
    </Grid>
  );
};

export default ProductChargeComponent;
