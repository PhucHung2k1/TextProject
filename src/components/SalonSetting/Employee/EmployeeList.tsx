import React, { useState } from 'react';
import Image from 'next/image';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Add, MoreHoriz, Search } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

interface IEmployee {
  id: number;
  employee: string;
  image: string;
  jobTitle: string;
  phoneNumber: string;
  rolePermission: string;
  payStructure: string;
  serviceProduct: string;
  status: string;
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
      image: '/assets/images/StoreProfile/image-welcome.svg',
      employee: 'Maynard Cobb (May)',
      jobTitle: 'Manager',
      phoneNumber: '123-456-7890',
      rolePermission: 'Technician',
      payStructure: 'Hourly',
      serviceProduct: 'Product',
      status: 'Active',
    },
    {
      id: 2,
      image: '/assets/images/StoreProfile/image-welcome.svg',
      employee: 'Lane Garraway (Lane)',
      jobTitle: 'Technician',
      phoneNumber: '123-456-7890',
      rolePermission: 'Therapist',
      payStructure: 'Commission - Guarantee',
      serviceProduct: 'Product',
      status: 'Inactive',
    },
    {
      id: 3,
      image: '/assets/images/StoreProfile/image-welcome.svg',
      employee: 'Tabitha Ferguson (Tabi)',
      jobTitle: 'Part time',
      phoneNumber: '123-456-7890',
      rolePermission: 'Manager',
      payStructure: 'Commission',
      serviceProduct: 'Product',
      status: 'Inactive',
    },
    {
      id: 4,
      image: '/assets/images/StoreProfile/image-welcome.svg',
      employee: 'Samantha Robson (Sana)',
      jobTitle: 'Part time',
      phoneNumber: '123-456-7890',
      rolePermission: 'Reception',
      payStructure: 'Salary',
      serviceProduct: 'Product',
      status: 'Inactive',
    },
  ];

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
                placeholder="Search"
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
                className="mb-1 h-12 bg-primary-main  text-white"
                startIcon={<Add />}
                sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
              >
                Add Employee
              </Button>
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-mango-gray-light-3">
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
                  <TableCell style={{ fontSize: '20px' }}>Employee</TableCell>
                  <TableCell className="text-base">Job Title</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Role & Permission</TableCell>
                  <TableCell>Pay Structure</TableCell>
                  <TableCell>Service & Product</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-base">
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="flex items-center gap-2">
                      <Image
                        src={row.image}
                        alt="img-welcome"
                        width={40}
                        height={40}
                        objectFit="cover"
                      />

                      {row.employee}
                    </TableCell>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.rolePermission}</TableCell>
                    <TableCell>{row.payStructure}</TableCell>
                    <TableCell>{row.serviceProduct}</TableCell>
                    <TableCell>
                      {row.status === 'Active' ? (
                        <div className="flex h-9 w-16 items-center justify-center rounded-full bg-green-light text-success-dark">
                          {row.status}
                        </div>
                      ) : (
                        <div className="flex h-9 w-20 items-center justify-center rounded-full bg-gray-light text-tertiary">
                          {row.status}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log(row);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EmployeeList;
