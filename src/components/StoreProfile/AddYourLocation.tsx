import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { listTimeZone } from '@/utils/helper/listTimeZone';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { handleForwardProgressSetupStore } from '@/components/StoreProfile/helper';
import { LayoutStoreProfile } from './LayoutStoreProfile';

interface IFormLocation {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  timeZone: string;
}

const AddYourLocation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handleSubmit, register } = useForm<IFormLocation>();
  const onSubmit = (values: IFormLocation) => {
    console.log('values', values);
  };

  return (
    <LayoutStoreProfile>
      <div className="px-8 pb-8 pt-12">
        <div className=" text-center">
          <div className="flex items-center justify-center ">
            <ArrowBackIcon
              onClick={() => router.back()}
              className="cursor-pointer text-3xl"
            />

            <p className="mx-auto text-[32px] font-semibold">
              Add your location
            </p>
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
                  label="Address line 1"
                  type="text"
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
                  label="Address line 2"
                  type="text"
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
                  label="City"
                  name="city"
                  type="text"
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
                  label="State"
                  type="text"
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
                  label="Zip code"
                  type="text"
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
                  options={listTimeZone.map((option) => option.text)}
                  renderInput={(params) => (
                    <TextField
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
            onClick={() => handleForwardProgressSetupStore(dispatch)}
          >
            CONTINUE
          </Button>
        </form>
      </div>
    </LayoutStoreProfile>
  );
};

export default AddYourLocation;
