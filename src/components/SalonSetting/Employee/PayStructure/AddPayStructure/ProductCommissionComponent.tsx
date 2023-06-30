import FormControlComponent from '@/common/Input/FormControlComponent';
import { sxSwitchBlue, sxTextField } from '@/utils/helper/styles';
import {
  Grid,
  Stack,
  FormControlLabel,
  Switch,
  FormControl,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  setPayStructureData: Function;
}
const ProductCommissionComponent = ({ setPayStructureData }: Props) => {
  const [productCommission, setProductCommission] = useState({
    AllowProductCommission: true,
    ProductCommissionPercent: 0,
    MaxPayoutProductCommissionPercent: 0,
  });
  const handleChangeValue = (value: boolean | string, name: string) => {
    setProductCommission((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prev: any) => ({
      ...prev,
      ProductCommission: productCommission,
    }));
  }, [productCommission]);
  return (
    <Grid xs={12} item className="">
      <Stack direction="column" spacing={2}>
        <div className="text-2xl font-semibold text-text-title">
          Product Commission
        </div>

        <Grid xs={12} item>
          <FormControlLabel
            sx={sxSwitchBlue}
            control={
              <Switch
                name="Allow"
                checked={productCommission.AllowProductCommission}
                onChange={(e) =>
                  handleChangeValue(e.target.checked, 'AllowProductCommission')
                }
              />
            }
            label="Allow"
          />
        </Grid>
        {productCommission.AllowProductCommission && (
          <Stack direction="row" spacing={2}>
            <Grid xs={6} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <FormControlComponent
                  name="ProductCommissionPercent"
                  startIconInputProps="percent"
                  label="Product Commission"
                  type="text"
                  sx={sxTextField}
                  value={productCommission.ProductCommissionPercent}
                  // className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
              </FormControl>
            </Grid>
            <Grid xs={6} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <FormControlComponent
                  name="MaxPayoutProductCommissionPercent"
                  sx={sxTextField}
                  label="Max Payout"
                  type="text"
                  value={productCommission.MaxPayoutProductCommissionPercent}
                  // className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
              </FormControl>
            </Grid>
          </Stack>
        )}
      </Stack>
    </Grid>
  );
};

export default ProductCommissionComponent;
