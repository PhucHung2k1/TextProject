import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';
import { listTimeZone } from '@/utils/helper/listTimeZone';

interface IFormInput {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  timeZone: string;
}

const AddYourLocation = () => {
  // const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    // register,
    // formState: { errors },
    handleSubmit,
    // setError,
    // trigger,
    // clearErrors,
    // watch,
  } = useForm<IFormInput>();
  const onSubmit = (values: IFormInput) => {
    console.log('values', values);
  };

  return (
    <div className="flex justify-center pt-[90px]">
      <div className=" w-[568px] rounded-2xl bg-white shadow-md">
        <LinearProgressWithLabel value={30} />
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

            <p className="text-mango-text-gray-2">
              Where can clients find you?
            </p>
          </div>

          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8" noValidate>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <FormControl
                  fullWidth
                  className="text-sm font-normal !text-mango-text-black-1"
                >
                  <TextField
                    label="Address line 1"
                    type="text"
                    name="addressLine1"
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
                    name="addressLine2"
                    type="text"
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
                    name="state"
                    type="text"
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
                    name="zipCode"
                    type="text"
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
                    id="grouped-demo"
                    options={listTimeZone.map((option) => option.text)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="timeZone"
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
      </div>
    </div>
  );
};

export default AddYourLocation;
