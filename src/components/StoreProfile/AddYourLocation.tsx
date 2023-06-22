import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from '@/components/StoreProfile/helper';
import { useState } from 'react';
import type { CountryPhone } from '@/services/common/common.interface';
import { updateLocationStoreProfile } from '@/store/store/storeAction';
import Cookies from 'js-cookie';
import { sxTextField } from '@/utils/helper/styles';

interface IFormLocation {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  timeZone: string;
}
interface Payload {
  op: string;
  path: string;
  value: string;
}
const AddYourLocation = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm<IFormLocation>();
  const curStoreCustomerId = Cookies.get('store-customer');
  const curStoreCustomer = useAppSelector(
    (state) => state.storeSlice.storeCustomer
  ).find((store) => store.Id === curStoreCustomerId);
  const listTimeZone = useAppSelector(
    (state) => state.commonSlice.lookupData.TimeZone
  );
  const [valueTimeZone, setValueTimeZone] = useState<CountryPhone | null>(
    listTimeZone.find((item) => item.Value === curStoreCustomer?.TimeZone) ||
      null
  );
  const onSubmit = (values: IFormLocation) => {
    const payload: Payload[] = [];
    const addPayload = (path: string, value: any) => {
      if (value !== curStoreCustomer?.[path.substring(1)]) {
        payload.push({
          op: 'replace',
          path,
          value,
        });
      }
    };
    addPayload('/Address1', values.addressLine1);
    addPayload('/Address2', values.addressLine2);
    addPayload('/City', values.city);
    addPayload('/State', values.state);
    addPayload('/ZipCode', values.zipCode);
    if (valueTimeZone?.Value) addPayload('/TimeZone', valueTimeZone?.Value);
    if (payload.length > 0) {
      dispatch(
        updateLocationStoreProfile({
          id: curStoreCustomer?.Id || '',
          body: payload,
        })
      );
    }
    handleForwardProgressSetupStore(dispatch);
  };

  return (
    <div>
      <div className=" text-center">
        <div className="flex items-center justify-center ">
          <ArrowBackIcon
            onClick={() => handlePreviousProgressSetupStore(dispatch)}
            className="cursor-pointer text-3xl"
          />

          <p className="mx-auto text-[32px] font-semibold">Add your location</p>
        </div>

        <p className="text-mango-text-gray-2">Where can clients find you?</p>
      </div>

      {/*  */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={sxTextField}
                label="Address line 1"
                type="text"
                defaultValue={curStoreCustomer?.Address1}
                {...register('addressLine1', {})}
                placeholder="Address line 1"
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={sxTextField}
                label="Address line 2"
                type="text"
                defaultValue={curStoreCustomer?.Address2}
                {...register('addressLine2', {})}
                placeholder="Address line 2"
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={sxTextField}
                label="City"
                {...register('city', {})}
                type="text"
                defaultValue={curStoreCustomer?.City}
                placeholder="City"
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </FormControl>
          </Grid>
          <Grid xs={6} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={sxTextField}
                label="State"
                type="text"
                defaultValue={curStoreCustomer?.State}
                {...register('state', {})}
                placeholder="State"
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </FormControl>
          </Grid>

          <Grid xs={6} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={sxTextField}
                label="Zip code"
                type="text"
                defaultValue={curStoreCustomer?.ZipCode}
                {...register('zipCode', {})}
                placeholder="Zip code"
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <Autocomplete
                getOptionLabel={(option) => option.Description}
                options={listTimeZone}
                value={valueTimeZone}
                onChange={(_e, value) => {
                  if (value) setValueTimeZone(value);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={sxTextField}
                    {...params}
                    {...register('timeZone', {})}
                    label="Time Zone"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Button
          type="submit"
          className="my-4 h-12 w-full bg-mango-primary-blue font-bold"
          variant="contained"
        >
          CONTINUE
        </Button>
      </form>
    </div>
  );
};

export default AddYourLocation;
