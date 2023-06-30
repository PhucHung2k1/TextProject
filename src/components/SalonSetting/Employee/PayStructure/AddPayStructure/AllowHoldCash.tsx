import { sxSwitchBlue } from '@/utils/helper/styles';
import { Grid, Stack, FormControlLabel, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  setPayStructureData: Function;
}
const AllowHoldCash = ({ setPayStructureData }: Props) => {
  const [holdCash, setHoldCash] = useState({ AllowHoldCash: true });
  const handleChangeValue = (value: boolean | string, name: string) => {
    setHoldCash((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prevState: any) => ({
      ...prevState,
      Configuration: {
        ...prevState.Configuration,
        HoldCash: holdCash,
      },
    }));
  }, [holdCash]);

  return (
    <Grid xs={12} item className="">
      <Stack direction="column" spacing={2}>
        <div className="text-2xl font-semibold text-text-title">
          Allow Hold Cash
        </div>

        <Stack direction="column" spacing={1} className="w-full">
          <Grid xs={12} item>
            <FormControlLabel
              sx={sxSwitchBlue}
              control={
                <Switch
                  name="Yes"
                  checked={holdCash.AllowHoldCash}
                  onChange={(e) =>
                    handleChangeValue(e.target.checked, 'AllowHoldCash')
                  }
                />
              }
              label="Yes"
            />
          </Grid>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default AllowHoldCash;
