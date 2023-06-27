import React from 'react';
import {
  Button,
  Box,
  FormGroup,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { LinearProgressWithLabel } from '../LinearProgressWithLabel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from '@/components/StoreProfile/helper';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import { useAppDispatch } from '@/store/hook';

const AddYourService = () => {
  // const [progress, setProgress] = useState<number>(0);

  const dispatch = useAppDispatch();

  return (
    <LayoutStoreProfile>
      <div className="relative text-center ">
        <ArrowBackIcon
          onClick={() => handlePreviousProgressSetupStore(dispatch)}
          className="absolute left-0 top-2 cursor-pointer text-3xl text-icon-color"
        />

        <p className="mx-auto text-[32px] font-semibold">Add your service</p>
      </div>
      <p className="text-center text-[14px] text-mango-text-gray-2">
        Set up services for clients to easily book an appointment with you
      </p>
      <FormGroup>
        <FormControlLabel
          className="ml-[1px] mt-[55px]"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#00BDD6',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#00BDD6',
            },
          }}
          control={<Switch />}
          label={
            <Box
              component="div"
              className="text-[16px] font-medium text-primary-dark"
            >
              Use Mango default category
            </Box>
          }
        />
      </FormGroup>
      <div className="w-full flex-1 ">
        <div className=" mb-[20x] mt-[25px] flex h-[166px] w-full ">
          <div
            className="flex w-full
        cursor-pointer items-center  justify-center gap-2 rounded-lg border border-dashed border-[#CBCBDB] bg-[#F9F9FA]"
          >
            <PersonAddIcon className="text-[#75778F]" fontSize="medium" />
            <div className="mt-1 text-base font-semibold text-[#75778F]">
              Add service
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-5">
        <Button
          className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize hover:bg-button-hover-cyan"
          variant="contained"
          onClick={() => handleForwardProgressSetupStore(dispatch)}
        >
          CONTINUE
        </Button>

        <div className="mt-1 flex">
          <p>Set category for you?</p>
          <span className="ml-1 font-bold text-mango-primary-blue">
            Contact us
          </span>
        </div>
      </div>
    </LayoutStoreProfile>
  );
};

export default AddYourService;
