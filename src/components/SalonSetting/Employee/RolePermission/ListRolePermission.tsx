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
import Badge from '@mui/material/Badge';
const General = () => {
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
      color: '#2D9DE3',
      avatarThumb: '/assets/images/RolePermission/4.svg',
      isActive: true,
    },
    {
      color: '#9D46DE',
      avatarThumb: '/assets/images/RolePermission/5.svg',
      isActive: true,
    },
    {
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/7.svg',
      isActive: false,
    },
    {
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/8.svg',
      isActive: true,
    },
    {
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/9.svg',
      isActive: false,
    },
    {
      color: '#7DB400',
      avatarThumb: '/assets/images/RolePermission/2.svg',
      isActive: true,
    },
    {
      color: '#2D9DE3',
      avatarThumb: '/assets/images/RolePermission/1.svg',
      isActive: false,
    },
  ];
  const accessibility = [
    {
      Text: 'function 1',
    },
    {
      Text: 'function 2',
    },
    {
      Text: 'function 3',
    },
    {
      Text: 'function 4',
    },
    {
      Text: 'function 5',
    },
    {
      Text: 'function 6',
    },
    {
      Text: 'function 7',
    },
    {
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
            className="h-[48px] w-[188px] bg-[#00BDD6] text-[16px] font-bold text-[#ffff] hover:bg-[#00ADC3]"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Role
          </Button>

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
            </FormControl>{' '}
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
              <TableRow className="text-[16px] align-top">
                <TableCell component="td" scope="row" className="text-[16px]">
                  Owner
                </TableCell>
                <TableCell component="td" scope="row" className="text-[16px]">
                  2 users
                  <AvatarGroup max={3} className="justify-end mt-[4px]">
                    {avatar.slice(0, 2).map((avatarItem, index) => (
                      <StyledBadge
                        isActive={avatarItem.isActive}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          key={index}
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
                      className="text-[16px] font-normal text-white bg-[#00BDD6] py-[7px] px-[10px]"
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
              <TableRow className="text-[16px] align-top w-[100%]">
                <TableCell
                  component="td"
                  scope="row"
                  className="text-[16px] w-[15%]"
                >
                  Manager
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className="text-[16px] w-[20%]"
                >
                  4 users
                  <AvatarGroup className="justify-end mt-[4px]">
                    {avatar.slice(0, 4).map((avatarItem, index) => (
                      <StyledBadge
                        isActive={avatarItem.isActive}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          key={index}
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
                      {accessibility.map((item, index) => (
                        <Chip
                          key={index}
                          className="overflow-visible mt-2 mr-2 float-right text-[16px] font-normal text-primary-dark bg-[#00BDD614] py-[7px] px-[10px] w-[100px]"
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
                <TableCell align="right" className="text-[16px] w-[10%]">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                    <CloseIcon fontSize="small" className="text-[#DA2036] " />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow className="text-[16px] align-top w-[100%]">
                <TableCell
                  component="td"
                  scope="row"
                  className="text-[16px] w-[20%]"
                >
                  Technician
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className="text-[16px] w-[20%]"
                >
                  {avatar.length} users
                  <AvatarGroup max={6} className="justify-end mt-[4px]">
                    {avatar.map((avatarItem, index) => (
                      <StyledBadge
                        isActive={avatarItem.isActive}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar
                          key={index}
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
                      {accessibility.slice(0, 6).map((item, index) => (
                        <Chip
                          key={index}
                          className="mt-2 mr-2 float-right text-[16px] font-normal text-primary-dark bg-[#00BDD614] py-[7px] px-[10px] w-[100px]"
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
                <TableCell align="right" className="text-[16px] w-[10%]">
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
