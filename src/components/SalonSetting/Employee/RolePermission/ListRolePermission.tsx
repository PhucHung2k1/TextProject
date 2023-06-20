import {
  Typography,
  IconButton,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Grid,
  AvatarGroup,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CustomDrawer from '@/common/Drawer/Drawer';
import AddForm from './FormLayout';

const General = () => {
  const [filterPayStructures, setFilterPayStructures] = useState('');
  const [filterRolePermission, setFilterRolePermission] = useState('');
  const handleFilterPayStructures = (event: any) => {
    setFilterPayStructures(event.target.value as string);
  };
  const handleFilterRolePermissionChange = (event: any) => {
    setFilterRolePermission(event.target.value as string);
  };
  const employeeList = ['Employee 1', 'Employee 2'];
  const functionList = ['Function'];

  return (
    <div className="">
      <div className="mt-[36px] flex items-center justify-between">
        <Typography
          variant="h2"
          component="h2"
          className="color-[#1F1F23] text-[32px] font-semibold"
        >
          Role & Permission
        </Typography>
        <div className="flex w-[500px] items-center justify-between">
          <FormControl
            sx={{
              '& .MuiInputBase-root.Mui-focused': {
                '& > fieldset': {
                  borderColor: '#00BDD6',
                },
              },
              '& label.Mui-focused': {
                color: '#00BDD6',
              },
            }}
            variant="outlined"
          >
            <OutlinedInput
              className="h-[48px] w-[212px]"
              id="outlined-adornment-weight"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'Password',
                placeholder: 'search...',
              }}
            />
          </FormControl>

          <CustomDrawer
            anchor="right"
            clickNode={
              <Button
                className="h-[48px] w-[188px] bg-[#00BDD6] text-[16px] font-bold text-[#ffff] hover:bg-[#00ADC3]"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Role
              </Button>
            }
            content={<AddForm />}
          />

          {/* <Button
            className=" h-[48px] w-[35] border-[#B0B2C6] text-[16px] font-bold text-[#ffff] hover:bg-[#5C5D6A29]"
            variant="outlined"
          >
            <MoreHorizIcon style={{ color: '#5C5D6A' }} />
          </Button> */}
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-mango-gray-light-3  hover:bg-[#5C5D6A29]">
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <div className="h-[80px] w-full bg-[##F3F4F6] ">
        <Grid xs={12} item>
          <div className=" mt-[24px] flex h-[80px] w-full items-center gap-6 rounded-sm bg-[#F3F4F6] py-7 pl-[16px] pr-4 ">
            <FormControl
              variant="outlined"
              size="small"
              className="w-[15%]"
              sx={{
                '& .MuiInputBase-root.Mui-focused': {
                  '& > fieldset': {
                    borderColor: '#00BDD6',
                  },
                },
                '& label.Mui-focused': {
                  color: '#00BDD6',
                },
              }}
            >
              <Select
                displayEmpty
                value={filterRolePermission}
                input={<OutlinedInput />}
                inputProps={{ 'aria-label': 'Without label' }}
                className="bg-white"
                onChange={handleFilterRolePermissionChange}
              >
                <MenuItem value="">
                  <p>All Employee</p>
                </MenuItem>
                {employeeList.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              size="small"
              className="w-[15%]"
              sx={{
                '& .MuiInputBase-root.Mui-focused': {
                  '& > fieldset': {
                    borderColor: '#00BDD6',
                  },
                },
                '& label.Mui-focused': {
                  color: '#00BDD6',
                },
              }}
            >
              <Select
                displayEmpty
                value={filterPayStructures}
                input={<OutlinedInput />}
                onChange={handleFilterPayStructures}
                inputProps={{ 'aria-label': 'Without label' }}
                className="bg-white"
              >
                <MenuItem value="">
                  <p>All Function</p>
                </MenuItem>
                {functionList.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Grid>
      </div>
      <div>
        <TableContainer className="mt-[35px]">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="pb-[7px] text-[14px] text-[#737277]">
                  ROLE
                </TableCell>
                <TableCell
                  className="pb-[7px] text-[14px] text-[#737277]"
                  align="left"
                >
                  EMPLOYEE
                </TableCell>
                <TableCell
                  className="pb-[7px] text-[14px] text-[#737277]"
                  align="left"
                >
                  ACCESSIBILITY
                </TableCell>
                <TableCell
                  className="pb-[7px] text-[14px] text-[#737277]"
                  align="left"
                />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Owner
                </TableCell>
                <TableCell component="th" scope="row">
                  <p>2 users</p>
                  <AvatarGroup total={24}>
                    <Avatar
                      className="border border-blue-400"
                      alt="Remy Sharp"
                      src="/assets/images/StoreProfile/image-welcome.svg"
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/assets/images/StoreProfile/image-welcome.svg"
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="/assets/images/StoreProfile/image-welcome.svg"
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="/assets/images/StoreProfile/image-welcome.svg"
                    />
                  </AvatarGroup>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="w-fit rounded-full bg-[#00BDD6] px-[10px] py-[7px] text-center text-[16px] text-[#ffff]">
                    All functions
                  </div>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                    <CloseIcon fontSize="small" className="text-[#DA2036] " />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default General;
