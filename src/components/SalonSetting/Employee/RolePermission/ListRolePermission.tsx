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

  Stack,
  Chip,
  Avatar,
  AvatarGroup,
  styled,

} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import CustomDrawer from '@/common/Drawer/Drawer';
import AddForm from './FormLayout';

import Badge from '@mui/material/Badge';

const ListRolePermission = () => {
  const StyledBadge = styled(Badge)<{ isActive: boolean }>(
    ({ theme, isActive }) => ({
      '& .MuiBadge-badge': {
        backgroundColor: isActive ? '#69B000' : '#9B9BA0',
        color: isActive ? '#69B000' : '#9B9BA0',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
        },
      },
    })
  );
  const avatar = [
    {
      Id: 1,
      color: '#2D9DE3',
      avatarThumb: '/assets/images/RolePermission/4.svg',
      isActive: true,
    },
    {
      Id: 2,
      color: '#9D46DE',
      avatarThumb: '/assets/images/RolePermission/5.svg',
      isActive: true,
    },
    {
      Id: 3,
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/7.svg',
      isActive: false,
    },
    {
      Id: 4,
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/8.svg',
      isActive: true,
    },
    {
      Id: 5,
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/9.svg',
      isActive: false,
    },
    {
      Id: 6,
      color: '#7DB400',
      avatarThumb: '/assets/images/RolePermission/2.svg',
      isActive: true,
    },
    {
      Id: 7,
      color: '#2D9DE3',
      avatarThumb: '/assets/images/RolePermission/1.svg',
      isActive: false,
    },
  ];
  const accessibility = [
    {
      Id: 1,
      Text: 'function 1',
    },
    {
      Id: 2,
      Text: 'function 2',
    },
    {
      Id: 3,
      Text: 'function 3',
    },
    {
      Id: 4,
      Text: 'function 4',
    },
    {
      Id: 5,
      Text: 'function 5',
    },
    {
      Id: 6,
      Text: 'function 6',
    },
    {
      Id: 7,
      Text: 'function 7',
    },
    {
      Id: 8,
      Text: 'function 8',
    },
  ];
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
    <div>
      <div className="mt-[36px] flex items-center justify-between">
        <Typography
          variant="h2"
          component="h2"
          className="text-[32px] font-semibold text-[#1F1F23]"
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
              <TableRow className=" text-[14px]">
                <TableCell className="pb-[7px]  text-[#737277]">ROLE</TableCell>
                <TableCell className="pb-[7px]  text-[#737277]" align="left">
                  EMPLOYEE
                </TableCell>
                <TableCell className="pb-[7px]  text-[#737277]" align="left">
                  ACCESSIBILITY
                </TableCell>
                <TableCell className="pb-[7px] text-[#737277]" align="left" />
              </TableRow>
            </TableHead>
            <TableBody className="text-[16px]">
              <TableRow className="align-top text-[16px]">
                <TableCell component="td" scope="row" className="text-[16px]">
                  Owner
                </TableCell>
                <TableCell component="td" scope="row" className="text-[16px]">
                  2 users
                  <AvatarGroup max={3} className="mt-[4px] justify-end">
                    {avatar.slice(0, 2).map((avatarItem) => (
                      <StyledBadge
                        isActive={avatarItem.isActive}
                        overlap="circular"
                        key={avatarItem.Id}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          src={avatarItem.avatarThumb}
                          style={{
                            border: `2px solid ${avatarItem.color}`,
                            background: '#DEDEE3',
                          }}
                        />
                      </StyledBadge>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell component="td" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Chip
                      className="bg-[#00BDD6] px-[10px] py-[7px] text-[16px] font-normal text-white"
                      label="All functions"
                    />
                  </Stack>
                </TableCell>
                <TableCell align="right" className="text-[16px]">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                    <CloseIcon fontSize="small" className="text-[#DA2036] " />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow className="w-[100%] align-top text-[16px]">
                <TableCell
                  component="td"
                  scope="row"
                  className="w-[15%] text-[16px]"
                >
                  Manager
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className="w-[20%] text-[16px]"
                >
                  4 users
                  <AvatarGroup className="mt-[4px] justify-end">
                    {avatar.slice(0, 4).map((avatarItem) => (
                      <StyledBadge
                        isActive={avatarItem.isActive}
                        overlap="circular"
                        key={avatarItem.Id}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          src={avatarItem.avatarThumb}
                          style={{
                            border: `2px solid ${avatarItem.color}`,
                            background: '#DEDEE3',
                          }}
                        />
                      </StyledBadge>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell component="td" scope="row" className="w-[50%]">
                  {accessibility.length} functions
                  <div>
                    <Stack direction="row" flexWrap="wrap">
                      {accessibility.map((item) => (
                        <Chip
                          key={item.Id}
                          className="float-right mr-2 mt-2 w-[100px] overflow-visible bg-[#00BDD614] px-[10px] py-[7px] text-[16px] font-normal text-primary-dark"
                          label={item.Text}
                          sx={{
                            '& .css-6od3lo-MuiChip-label': {
                              overflow: 'unset',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </div>
                </TableCell>
                <TableCell align="right" className="w-[10%] text-[16px]">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                    <CloseIcon fontSize="small" className="text-[#DA2036] " />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow className="w-[100%] align-top text-[16px]">
                <TableCell
                  component="td"
                  scope="row"
                  className="w-[20%] text-[16px]"
                >
                  Technician
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className="w-[20%] text-[16px]"
                >
                  {avatar.length} users
                  <AvatarGroup max={6} className="mt-[4px] justify-end">
                    {avatar.map((avatarItem) => (
                      <StyledBadge
                        isActive={avatarItem.isActive}
                        key={avatarItem.Id}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          src={avatarItem.avatarThumb}
                          style={{
                            border: `2px solid ${avatarItem.color}`,
                            background: '#DEDEE3',
                          }}
                        />
                      </StyledBadge>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell component="td" scope="row" className="w-[50%]">
                  6 functions
                  <div>
                    <Stack direction="row" flexWrap="wrap">
                      {accessibility.slice(0, 6).map((item) => (
                        <Chip
                          key={item.Id}
                          className="float-right mr-2 mt-2 w-[100px] bg-[#00BDD614] px-[10px] py-[7px] text-[16px] font-normal text-primary-dark"
                          label={item.Text}
                          sx={{
                            '& .css-6od3lo-MuiChip-label': {
                              overflow: 'unset',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </div>
                </TableCell>
                <TableCell align="right" className="w-[10%] text-[16px]">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                    <CloseIcon fontSize="small" className="text-[#DA2036] " />
                  </IconButton>
                </TableCell>
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

export default ListRolePermission;
