import { sxTextField } from '@/utils/helper/styles';
import {
  FormControl,
  TextField,
  InputAdornment,
  Stack,
  Box,
  Typography,
  FormLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PercentIcon from '@mui/icons-material/Percent';

interface Props {
  label: string;
  value: number;
  setValue: Function;
}
const InputTwoValue = ({ label, value, setValue }: Props) => {
  const [showDiv, setShowDiv] = useState(true);

  const [valueRaw, setValueRaw] = useState<number>(value);

  const [selectedValue, setSelectedValue] = useState(1);
  const handleShowDiv = () => {
    setShowDiv(!showDiv);
  };
  const handleChangeValue = (valueNumber: string) => {
    const newValue = Number(
      selectedValue === 1 ? valueNumber : 100 - Number(valueNumber)
    );
    if (newValue <= 100 && newValue >= 0) {
      setValueRaw(newValue);
    }
  };
  useEffect(() => {
    setValue(valueRaw);
  }, [valueRaw]);

  return (
    <Box className="w-full">
      {showDiv ? (
        <>
          <FormControl className="w-full">
            <FormLabel className="absolute left-[8px] top-[-8px] bg-white px-[6px] text-xs">
              {label}
            </FormLabel>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              className="h-14 rounded border border-mango-text-gray-1"
            >
              <Box
                onClick={() => {
                  setSelectedValue(1);
                  handleShowDiv();
                }}
              >
                <PercentIcon color="action" /> {valueRaw}
              </Box>

              <Typography fontSize={24} className=" text-line-main">
                /
              </Typography>
              <Box
                onClick={() => {
                  setSelectedValue(2);
                  handleShowDiv();
                }}
              >
                <PercentIcon color="action" /> {100 - valueRaw}
              </Box>
            </Stack>
          </FormControl>
        </>
      ) : (
        <FormControl
          fullWidth
          className=" text-sm font-normal !text-mango-text-black-1"
        >
          <TextField
            sx={sxTextField}
            type="number"
            label={label}
            autoFocus
            onBlur={() => handleShowDiv()}
            className="!rounded-sm border border-mango-text-gray-1 !outline-none"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PercentIcon />
                </InputAdornment>
              ),
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleShowDiv();
              }
            }}
            onChange={(e) => {
              handleChangeValue(e.target.value);
            }}
          />
        </FormControl>
      )}
    </Box>
  );
};

export default InputTwoValue;
