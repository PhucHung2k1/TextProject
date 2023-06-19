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
  Paper,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
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
          className="text-[32px] color-[#1F1F23] font-semibold"
        >
          Role & Permission
        </Typography>
        <div className="flex items-center justify-between w-[500px]">
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
                  {' '}
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

          <Button
            className="bg-[#00BDD6] text-[#ffff] text-[16px] font-bold w-[188px] h-[48px] hover:bg-[#00ADC3]"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Role
          </Button>

          <Button
            className=" text-[#ffff] text-[16px] font-bold w-[35] h-[48px] hover:bg-[#5C5D6A29] border-[#B0B2C6]"
            variant="outlined"
          >
            <MoreHorizIcon style={{ color: '#5C5D6A' }} />
          </Button>
        </div>
      </div>
      <div className="bg-[##F3F4F6] w-full h-[80px] ">
        <Grid xs={12} item>
          <div className=" bg-[#F3F4F6] w-full h-[80px] flex items-center gap-6 rounded-sm pr-4 pl-[16px] py-7 mt-[24px] ">
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
            </FormControl>{' '}
          </div>
        </Grid>
      </div>
      <div>
        <TableContainer className="mt-[35px]">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-[#737277] text-[14px] pb-[7px]">
                  ROLE
                </TableCell>
                <TableCell
                  className="text-[#737277] text-[14px] pb-[7px]"
                  align="left"
                >
                  EMPLOYEE
                </TableCell>
                <TableCell
                  className="text-[#737277] text-[14px] pb-[7px]"
                  align="left"
                >
                  ACCESSIBILITY
                </TableCell>
                <TableCell
                  className="text-[#737277] text-[14px] pb-[7px]"
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell component="th" scope="row">
                Owner
              </TableCell>
              <TableCell component="th" scope="row">
                2 users
              </TableCell>
              <TableCell component="th" scope="row">
                <div className="bg-[#00BDD6] text-[#ffff] text-[16px] text-center w-fit py-[7px] px-[10px] rounded-full">
                  All functions{' '}
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
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default General;
