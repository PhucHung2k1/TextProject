/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';

const ConfirmYourAddress = () => {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const [valueSearchMap, setValueSearchMap] = useState<string>('');
  const [listResultAddress, setListResultAddress] = useState<string[]>(['']);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSearchMap = (value: string) => {
    setValueSearchMap(value);
  };

  useEffect(() => {
    if (valueSearchMap.length > 0) {
      setLoading(true);
      // For testing purposes
      setTimeout(() => {
        setLoading(false);
        setListResultAddress([
          '142 White Ash Dr, Southaven, MS 38671, US.',
          '142 White Ash Dr, Southaven, MS 38672, US.',
          '142 White Ash Dr, Southaven, MS 38673, US.',
        ]);
      }, 1500);
    }
  }, [valueSearchMap]);

  return (
    <div className="flex justify-center pt-[90px] ">
      <div className="w-[568px]  rounded-2xl bg-white shadow-md">
        <LinearProgressWithLabel value={30} />
        <div className="px-8 pb-8 pt-12">
          <div className=" text-center">
            <div className="flex items-center justify-center ">
              <ArrowBackIcon
                onClick={() => router.back()}
                className="cursor-pointer text-3xl"
              />

              <p className="mx-auto text-[32px] font-semibold">
                Confirm your address
              </p>
            </div>

            <p className="text-mango-text-gray-2">
              Where can clients find you?
            </p>
          </div>

          {/*  */}
          <div className="mt-10">
            <Autocomplete
              options={listResultAddress}
              freeSolo
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              value={valueSearchMap}
              onInputChange={(_e, value) => handleSearchMap(value)}
              noOptionsText="No locations"
              loading={loading}
              renderOption={(props, option) => {
                return (
                  <li {...props}>
                    <Grid container alignItems="center">
                      <Grid item sx={{ display: 'flex', width: 44 }}>
                        <LocationOnIcon sx={{ color: 'text.secondary' }} />
                      </Grid>
                      <Grid
                        item
                        sx={{
                          width: 'calc(100% - 44px)',
                          wordWrap: 'break-word',
                        }}
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {option}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Search"
                    label="Search your address"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="mt-5 flex h-56 w-full items-center justify-center border border-mango-text-gray-1">
            Google Map
          </div>

          <Button
            className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize "
            variant="contained"
            disabled
          >
            CONTINUE
          </Button>
          <div className="mt-4 text-center ">
            <span>Can&apos;t find your address? </span>
            <Link href="/" passHref>
              <a className="font-bold text-mango-primary-blue">
                Add your location
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmYourAddress;
