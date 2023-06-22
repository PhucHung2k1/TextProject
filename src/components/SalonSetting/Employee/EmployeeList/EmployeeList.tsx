import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Add, MoreHoriz, Search } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
// eslint-disable-next-line import/no-cycle
import EditEmployee from './EditEmployee';

export interface IEmployee {
  id: number;
  employee: string;
  image?: any | string;
  jobTitle: string;
  phoneNumber: string;
  rolePermission: string;
  payStructure: string;
  serviceProduct: string;
  status: string;
  color: string;
}

const arrRolePermission = [
  'Technician',
  'Facial Care Technician',
  'Therapist',
  'Manager',
  'Reception',
];
const arrPayStructures = [
  'Commission',
  'Commission - Guarantee',
  'Salary',
  'Hourly',
];
const arrStatus = ['Active', 'Inactive'];
const EmployeeList = () => {
  const data: IEmployee[] = [
    {
      id: 1,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 1',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 2,
      image: '/assets/images/RolePermission/7.svg',
      employee: 'Lane Garraway (Lane) 2',
      jobTitle: 'Technician',
      phoneNumber: '123-456-7890',
      rolePermission: 'Therapist',
      payStructure: 'Commission - Guarantee',
      serviceProduct: 'Product',
      status: 'Inactive',
      color: '#D03552',
    },
    {
      id: 3,
      image: '/assets/images/RolePermission/8.svg',
      employee: 'Tabitha Ferguson (Tabi) 3',
      jobTitle: 'Part time',
      phoneNumber: '123-456-7890',
      rolePermission: 'Manager',
      payStructure: 'Commission',
      serviceProduct: 'Product',
      status: 'Inactive',
      color: '#00AD93',
    },
    {
      id: 4,
      image: '/assets/images/RolePermission/8.svg',
      employee: 'Samantha Robson (Sana) 4',
      jobTitle: 'Part time',
      phoneNumber: '123-456-7890',
      rolePermission: 'Reception',
      payStructure: 'Salary',
      serviceProduct: 'Product',
      status: 'Inactive',
      color: '#7DB400',
    },
    {
      id: 5,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 5',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 6,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 6',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 7,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 7',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 8,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 8',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 9,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 9',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 10,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 10',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 11,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 11',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 12,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 12',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 13,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 13',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 14,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 14',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
    {
      id: 15,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 15',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
      color: '#2D9DE3',
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>();
  const [open, setOpen] = React.useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [filterStatus, setFilterStatus] = useState('');

  const [filterPayStructures, setFilterPayStructures] = useState('');
  const [filterRolePermission, setFilterRolePermission] = useState('');
  const handleFilterPayStructures = (event: any) => {
    setFilterPayStructures(event.target.value as string);
  };

  const handleFilterStatus = (event: any) => {
    setFilterStatus(event.target.value as string);
  };

  const handleFilterRolePermissionChange = (event: any) => {
    setFilterRolePermission(event.target.value as string);
  };
  const filteredData = data.filter(
    (row) =>
      row.rolePermission
        .toLowerCase()
        .includes(filterRolePermission.toLowerCase()) &&
      row.payStructure
        .toLowerCase()
        .includes(filterPayStructures.toLowerCase()) &&
      ((filterStatus === 'Active' && row.status === 'Active') ||
        (filterStatus === 'Inactive' && row.status === 'Inactive') ||
        (filterStatus === '' && row.status))
  );
  const StyledBadge = styled(Badge)<{ isActive: boolean }>(({ isActive }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: isActive ? '#69B000' : '#9B9BA0',
      color: isActive ? '#69B000' : '#9B9BA0',
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
  }));
  const handleEditEmployee = (item: IEmployee) => {
    handleOpenDrawer();
    setSelectedEmployee(item);
  };

  return (
    <>
      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <p className="text-3xl font-semibold text-text-title">
              Employee list
            </p>
          </Grid>
          <Grid xs={6} item>
            <div className="flex w-full items-center justify-end gap-6">
              <TextField
                variant="outlined"
                placeholder="Search..."
                InputProps={{
                  style: { height: '48px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                className="mb-1 h-12 bg-primary-main  text-base font-bold text-white"
                startIcon={<Add />}
                sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
              >
                Add Employee
              </Button>
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-mango-gray-light-3 hover:bg-[#5C5D6A29]">
                <MoreHoriz />
              </div>
            </div>
          </Grid>
          <Grid xs={12} item>
            <div className="flex h-20 w-full items-center gap-6 rounded-sm bg-bg-light px-4 py-7 ">
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  displayEmpty
                  value={filterRolePermission}
                  input={<OutlinedInput />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                  onChange={handleFilterRolePermissionChange}
                >
                  <MenuItem value="">
                    <p>All Role & Permission</p>
                  </MenuItem>
                  {arrRolePermission.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  displayEmpty
                  value={filterPayStructures}
                  input={<OutlinedInput />}
                  onChange={handleFilterPayStructures}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                >
                  <MenuItem value="">
                    <p>All Pay Structures</p>
                  </MenuItem>
                  {arrPayStructures.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{' '}
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  displayEmpty
                  value={filterStatus}
                  input={<OutlinedInput />}
                  label="Filter Employee"
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                  onChange={handleFilterStatus}
                >
                  <MenuItem value="">
                    <p>All Status</p>
                  </MenuItem>
                  {arrStatus.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid xs={12} item>
            <Table>
              <TableHead>
                <TableRow className=" uppercase">
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Employee
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Job Title
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Phone Number
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Role & Permission
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Pay Structure
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Service & Product
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Status
                  </TableCell>
                  <TableCell className="text-sm text-mango-text-gray-2">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-base">
                {filteredData.slice(startIndex, endIndex).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className=" text-base text-primary-dark">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <StyledBadge
                          isActive={row.status === 'Active'}
                          overlap="circular"
                          key={row.id}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          variant="dot"
                        >
                          <Avatar
                            src={row.image}
                            style={{
                              border: `2px solid ${row.color}`,
                              background: '#DEDEE3',
                            }}
                          />
                        </StyledBadge>
                        <div> {row.employee}</div>
                      </Stack>
                    </TableCell>
                    <TableCell className="text-base text-primary-dark">
                      {row.jobTitle}
                    </TableCell>
                    <TableCell className="text-base text-primary-dark">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell className="text-base text-primary-dark">
                      <Chip
                        className="   bg-blue-50 px-1 text-[16px]  text-blue-700"
                        label={row.rolePermission}
                        sx={{
                          '& .css-6od3lo-MuiChip-label': {
                            overflow: 'unset',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-base text-primary-dark">
                      <Chip
                        className="  bg-pink-50 px-1 text-[16px]  text-pink-500"
                        label={row.payStructure}
                        sx={{
                          '& .css-6od3lo-MuiChip-label': {
                            overflow: 'unset',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-base text-primary-dark">
                      <Chip
                        className="  bg-cyan-50 px-1 text-[16px]  text-cyan-700"
                        label={row.serviceProduct}
                        sx={{
                          '& .css-6od3lo-MuiChip-label': {
                            overflow: 'unset',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {row.status === 'Active' ? (
                        <Chip
                          className="   bg-green-light px-1 text-[16px]  text-success-dark"
                          label={row.status}
                          sx={{
                            '& .css-6od3lo-MuiChip-label': {
                              overflow: 'unset',
                            },
                          }}
                        />
                      ) : (
                        <Chip
                          className="   bg-gray-light px-1 text-[16px]  text-tertiary"
                          label={row.status}
                          sx={{
                            '& .css-6od3lo-MuiChip-label': {
                              overflow: 'unset',
                            },
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell className="">
                      <Stack direction="row" alignItems="center" spacing={0}>
                        <IconButton onClick={() => handleEditEmployee(row)}>
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                          <CloseIcon
                            fontSize="small"
                            className="text-[#DA2036] "
                          />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[8, 15]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>{' '}
        <Drawer anchor="right" open={open} onClose={handleCloseDrawer}>
          <EditEmployee
            handleCloseDrawer={handleCloseDrawer}
            selectedEmployee={selectedEmployee}
          />
        </Drawer>
      </div>
    </>
  );
};

export default EmployeeList;
