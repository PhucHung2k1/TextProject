import { sxRadioBlue, sxTextField } from '@/utils/helper/styles';
import {
  Grid,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormControlComponent from '@/common/Input/FormControlComponent';

interface Props {
  setPayStructureData: Function;
}
const TipOnCCComponent = ({ setPayStructureData }: Props) => {
  const [tipOnCC, setTipOnCC] = useState({
    TipOnCCType: 'TipOnCCFeeFromCreditCard',
    TipOnCCFeeFromCreditCard: '0',
    TipOnCCDailyFixedFee: '0',
  });
  const handleChangeValue = (value: boolean | string, name: string) => {
    setTipOnCC((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prevState: any) => ({
      ...prevState,
      Configuration: {
        ...prevState.Configuration,
        TipOnCC: tipOnCC,
      },
    }));
  }, [tipOnCC]);
  return (
    <Grid xs={12} item>
      <Stack direction="column" spacing={2}>
        <div className="text-2xl font-semibold text-text-title">Tip on CC</div>

        <FormControl>
          <RadioGroup
            value={tipOnCC.TipOnCCType}
            onChange={(e) => handleChangeValue(e.target.value, 'TipOnCCType')}
          >
            <Stack direction="row" spacing={2} className="w-full">
              <Grid xs={6} item>
                <FormControlLabel
                  value="TipOnCCFeeFromCreditCard"
                  control={<Radio sx={sxRadioBlue} />}
                  label="Fee from credit card"
                />

                <FormControlComponent
                  name="TipOnCCFeeFromCreditCard"
                  startIconInputProps="percent"
                  type="number"
                  sx={sxTextField}
                  value={tipOnCC.TipOnCCFeeFromCreditCard}
                  onChange={(e: any) =>
                    handleChangeValue(
                      e.target.value,
                      'TipOnCCFeeFromCreditCard'
                    )
                  }
                  disabled={tipOnCC.TipOnCCType !== 'TipOnCCFeeFromCreditCard'}
                />
              </Grid>

              <Grid xs={6} item>
                <FormControlLabel
                  value="TipOnCCDailyFixedFee"
                  control={<Radio sx={sxRadioBlue} />}
                  label="Daily fixed fee"
                />

                <FormControlComponent
                  name="TipOnCCDailyFixedFee"
                  type="number"
                  sx={sxTextField}
                  startIconInputProps="percent"
                  value={tipOnCC.TipOnCCDailyFixedFee}
                  onChange={(e: any) =>
                    handleChangeValue(e.target.value, 'TipOnCCDailyFixedFee')
                  }
                  disabled={tipOnCC.TipOnCCType !== 'TipOnCCDailyFixedFee'}
                />
              </Grid>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Stack>
    </Grid>
  );
};

export default TipOnCCComponent;
