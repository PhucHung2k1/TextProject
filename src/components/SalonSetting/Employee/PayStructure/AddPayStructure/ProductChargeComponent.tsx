import FormControlComponent from '@/common/Input/FormControlComponent';
import type { ProductCharge } from '@/services/payStructure.service/payStructure.interface';
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
  productChargeData: ProductCharge;
  setPayStructureData: Function;
}
const ProductChargeComponent = ({
  productChargeData,
  setPayStructureData,
}: Props) => {
  const [productCharge, setProductCharge] =
    useState<ProductCharge>(productChargeData);
  const handleChangeValue = (
    value: boolean | string | number,
    name: string
  ) => {
    setProductCharge((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prevState: any) => ({
      ...prevState,
      Configuration: {
        ...prevState.Configuration,
        ProductCharge: productCharge,
      },
    }));
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
                  onChange={(e: any) =>
                    handleChangeValue(e.target.value, 'BaseOnTicketAmount')
                  }
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
                      onChange={(e: any) =>
                        handleChangeValue(
                          e.target.value,
                          'BaseOnTicketMinChargeAmount'
                        )
                      }
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
                      name="BaseOnTicketMinChargePercent"
                      sx={[sxTextField, { marginLeft: 2 }]}
                      type="number"
                      startIconInputProps="money"
                      value={productCharge.BaseOnTicketMinChargePercent}
                      onChange={(e: any) =>
                        handleChangeValue(
                          e.target.value,
                          'BaseOnTicketMinChargePercent'
                        )
                      }
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
