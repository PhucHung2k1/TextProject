import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Chip,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
// eslint-disable-next-line import/no-cycle
import EditEmployee from './EditEmployee';
import { sxSelect } from '@/utils/helper/styles';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getEmployeeList } from '@/store/employee/employeeAction';
import { squareIconButtonStyles } from '@/helper/styleButton';

export interface IEmployee {
  id: number;
  employee: string;
  image?: any | string;
  jobTitle: string;
  phoneNumber: string;
  rolePermission: string[];
  payStructure: string;
  serviceProduct: string;
  status: boolean;
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
      rolePermission: ['Technician', 'Technician 1'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 2,
      image: '/assets/images/RolePermission/7.svg',
      employee: 'Lane Garraway (Lane) 2',
      jobTitle: 'Technician',
      phoneNumber: '123-456-7890',
      rolePermission: ['Therapist', 'Therapist 1'],
      payStructure: 'Commission - Guarantee',
      serviceProduct: 'Product',
      status: false,
      color: '#D03552',
    },
    {
      id: 3,
      image: '/assets/images/RolePermission/8.svg',
      employee: 'Tabitha Ferguson (Tabi) 3',
      jobTitle: 'Part time',
      phoneNumber: '123-456-7890',
      rolePermission: ['Manager'],
      payStructure: 'Commission',
      serviceProduct: 'Product',
      status: true,
      color: '#00AD93',
    },
    {
      id: 4,
      image: '/assets/images/RolePermission/8.svg',
      employee: 'Samantha Robson (Sana) 4',
      jobTitle: 'Part time',
      phoneNumber: '123-456-7890',
      rolePermission: ['Reception'],
      payStructure: 'Salary',
      serviceProduct: 'Product',
      status: true,
      color: '#7DB400',
    },
    {
      id: 5,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 5',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 6,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 6',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 7,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 7',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 8,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 8',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 9,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 9',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 10,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 10',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 11,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 11',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      serviceProduct: 'Product',
      payStructure: 'Hourly',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 12,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 12',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      serviceProduct: 'Product',
      payStructure: 'Hourly',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 13,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 13',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      serviceProduct: 'Product',
      payStructure: 'Hourly',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 14,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 14',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      serviceProduct: 'Product',
      payStructure: 'Hourly',
      status: true,
      color: '#2D9DE3',
    },
    {
      id: 15,
      image: '/assets/images/RolePermission/4.svg',
      employee: 'Maynard Cobb (May) 15',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: ['Technician'],
      serviceProduct: 'Product',
      payStructure: 'Hourly',
      status: true,
      color: '#2D9DE3',
    },
  ];
  const [employees, setEmployees] = useState(data);
  const dispatch = useAppDispatch();
  const employeesList = useAppSelector(
    (state) => state.employeeSlice.employees
  );
  console.log(
    '🚀 ~ file: EmployeeList.tsx:249 ~ EmployeeList ~ employeesList:',
    employeesList
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>();
  const [open, setOpen] = React.useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, employees.length);

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

  const filteredData = employees.filter((row) => {
    if (
      (filterStatus === '' ||
        (filterStatus === 'Active' && row.status) ||
        (filterStatus === 'Inactive' && !row.status)) &&
      (filterRolePermission === '' ||
        row.rolePermission.includes(filterRolePermission)) &&
      (filterPayStructures === '' ||
        row.payStructure.includes(filterPayStructures))
    ) {
      return true;
    }
    return false;
  });
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
  const handleSwitchChange = (id: any) => {
    setEmployees((prevEmployees) => {
      return prevEmployees.map((employee) => {
        if (employee.id === id) {
          return {
            ...employee,
            status: !employee.status,
          };
        }
        return employee;
      });
    });
  };
  useEffect(() => {
    dispatch(getEmployeeList({}));
  }, []);
  return (
    <>
      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <div className="flex h-20 w-full items-center gap-6 rounded-sm bg-bg-light px-4 py-7 ">
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  sx={sxSelect}
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
                  sx={sxSelect}
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
                  sx={sxSelect}
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
            <Paper
              sx={{
                width: '100%',
                overflow: 'auto',
                maxHeight: '560px',
                boxShadow: 'none',
              }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                className="  overflow-auto"
              >
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
                <TableBody className="text-base ">
                  {filteredData.slice(startIndex, endIndex).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className=" text-base text-primary-dark">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <StyledBadge
                            isActive={row.status === true}
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
                        <Stack direction="row" spacing={1}>
                          {row.rolePermission
                            .slice(0, 1)
                            .map((itemPermission) => (
                              <Chip
                                key={`${Math.random()}`}
                                label={itemPermission}
                                className="bg-blue-50 px-1 text-[16px]  text-blue-700"
                              />
                            ))}
                          {row.rolePermission.slice(1).length > 0 && (
                            <Chip
                              label={`+${row.rolePermission.slice(1).length}`}
                              className="cursor-pointer bg-blue-50 px-1  text-[16px] text-blue-700"
                            />
                          )}
                        </Stack>
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
                        <Switch
                          checked={row.status}
                          color="success"
                          onChange={() => handleSwitchChange(row.id)}
                        />
                        {row.status ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell className="">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton
                            className="bg-bg-light"
                            onClick={() => handleEditEmployee(row)}
                            style={squareIconButtonStyles}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            className="bg-[#FFEBEF] hover:bg-[#FFEBEF]"
                            style={squareIconButtonStyles}
                          >
                            <ContentCopyOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            className="bg-[#FFEBEF] hover:bg-[#FFEBEF]"
                            style={squareIconButtonStyles}
                          >
                            <DeleteOutlineOutlinedIcon
                              fontSize="medium"
                              className="text-[#DA2036] "
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <TablePagination
              rowsPerPageOptions={[7, 15]}
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
