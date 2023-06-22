import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  AvatarGroup,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Add, MoreHoriz, Search } from '@mui/icons-material';
import { styled } from '@mui/system';
// eslint-disable-next-line import/no-cycle
import DrawerAddPayStructure from './AddPayStructure/DrawerAddPayStructure';

// eslint-disable-next-line import/no-cycle
interface IEmployee {
  name?: string;
  avatar: string;
  color: string;
  isActive: boolean;
}

interface IPayStructure {
  id: number;
  role: string;
  employee: IEmployee[];
  paystructureType: string;
}

const arrPayStructureType = [
  'Commission-Guarantee',
  'Commission',
  'Salary',
  'Hourly',
];

const data: IPayStructure[] = [
  {
    id: 1,
    role: 'Owner',
    employee: [
      {
        avatar: '/assets/images/RolePermission/4.svg',
        color: '#2D9DE3',
        name: 'A',
        isActive: true,
      },
      {
        avatar: '/assets/images/RolePermission/5.svg',
        color: '#9D46DE',
        name: 'A',
        isActive: true,
      },
    ],
    paystructureType: 'Commission-Guarantee',
  },
  {
    id: 2,
    role: 'Technician',
    employee: [
      {
        avatar: '/assets/images/RolePermission/4.svg',
        color: '#2D9DE3',
        name: 'B',
        isActive: true,
      },
      {
        avatar: '/assets/images/RolePermission/4.svg',
        color: '#9D46DE',
        name: 'B',
        isActive: true,
      },
      {
        avatar: '/assets/images/RolePermission/7.svg',
        color: '#2D9DE3',
        name: 'B',
        isActive: true,
      },
      {
        avatar: '/assets/images/RolePermission/6.svg',
        color: '#9D46DE',
        name: 'B',
        isActive: true,
      },
    ],
    paystructureType: 'Commission',
  },
  {
    id: 3,
    role: 'Reception',
    employee: [
      {
        avatar: '/assets/images/RolePermission/4.svg',
        color: '#2D9DE3',
        name: 'C',
        isActive: true,
      },
    ],
    paystructureType: 'Salary',
  },
  {
    id: 4,
    role: 'Part time',
    employee: [
      {
        avatar: '/assets/images/RolePermission/5.svg',
        color: '#2D9DE3',
        name: 'D',
        isActive: true,
      },
      {
        avatar: '/assets/images/RolePermission/6.svg',
        color: '#2D9DE3',
        name: 'D',
        isActive: true,
      },
      {
        avatar: '/assets/images/RolePermission/5.svg',
        color: '#2D9DE3',
        name: 'D',
        isActive: true,
      },
    ],
    paystructureType: 'Hourly',
  },
  {
    id: 5,
    role: 'Part time',
    employee: [
      {
        avatar: '/assets/images/RolePermission/5.svg',
        color: '#2D9DE3',
        name: 'D',
        isActive: false,
      },
    ],
    paystructureType: 'Hourly',
  },
];

const arrEmployee = ['A', 'B', 'C', 'D'];
const PayStructure = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filterPayType, setFilterPayType] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<IPayStructure>();
  // eslint-disable-next-line no-console
  console.log(selectedEmployee);
  const [openAddDrawer, setOpenAddDrawer] = React.useState(false);
  const handleOpenAddDrawer = () => {
    setOpenAddDrawer(true);
  };
  const handleCloseAddDrawer = () => {
    setOpenAddDrawer(false);
  };
  const handleFilterPayType = (event: any) => {
    setFilterPayType(event.target.value as string);
  };
  const handleFilterEmployee = (event: any) => {
    setFilterEmployee(event.target.value as string);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const filteredData = data.filter((row) => {
    if (filterPayType !== '' && filterEmployee !== '') {
      return (
        row.paystructureType
          .toLowerCase()
          .includes(filterPayType.toLowerCase()) &&
        row.employee.some(
          (employee) =>
            employee.name &&
            employee.name.toLowerCase().includes(filterEmployee.toLowerCase())
        )
      );
    }
    if (filterPayType !== '') {
      return row.paystructureType
        .toLowerCase()
        .includes(filterPayType.toLowerCase());
    }
    if (filterEmployee !== '') {
      return row.employee.some(
        (employee) =>
          employee.name &&
          employee.name.toLowerCase().includes(filterEmployee.toLowerCase())
      );
    }
    return true;
  });
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
  // handle Select Employee
  const handleEditEmployee = (item: IPayStructure) => {
    handleOpenAddDrawer();
    setSelectedEmployee(item);
  };

  return (
    <>
      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <p className="text-3xl font-semibold text-text-title">
              Pay Structure
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
                onChange={(event) => {
                  setFilterEmployee(event.target.value);
                }}
              />
              <Button
                variant="contained"
                className="mb-1 h-12 bg-primary-main  text-base font-bold text-white"
                startIcon={<Add />}
                sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                onClick={handleOpenAddDrawer}
              >
                ADD PAY STRUCTURE
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
                  value={filterPayType}
                  input={<OutlinedInput />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                  onChange={handleFilterPayType}
                >
                  <MenuItem value="">
                    <p>Paystructure type</p>
                  </MenuItem>
                  {arrPayStructureType.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  displayEmpty
                  value={filterEmployee}
                  input={<OutlinedInput />}
                  onChange={handleFilterEmployee}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                >
                  <MenuItem value="">
                    <p>All Employee</p>
                  </MenuItem>
                  {arrEmployee.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{' '}
            </div>
          </Grid>
          <Grid xs={12} item>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className=" uppercase">
                    <TableCell className=" text-text-secondary">
                      Pay Structure Group
                    </TableCell>
                    <TableCell className=" text-text-secondary" align="left">
                      Pay Structure Type
                    </TableCell>
                    <TableCell className=" text-text-secondary" align="left">
                      Employee
                    </TableCell>
                    <TableCell className="text-text-secondary" align="left" />
                  </TableRow>
                </TableHead>
                <TableBody className="text-base">
                  {filteredData.slice(startIndex, endIndex).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        component="td"
                        scope="row"
                        className="text-base"
                      >
                        {row.role}
                      </TableCell>
                      <TableCell
                        component="td"
                        scope="row"
                        className="text-base"
                      >
                        <Chip
                          className="  bg-pink-50 px-1 text-base  text-pink-500"
                          label={row.paystructureType}
                          sx={{
                            '& .css-6od3lo-MuiChip-label': {
                              overflow: 'unset',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="td"
                        scope="row"
                        className="min-w-[500px] text-base"
                      >
                        {row.employee.length} users
                        <AvatarGroup max={5} className="mt-[4px] justify-end">
                          {row.employee.map((avatarItem) => {
                            return (
                              <StyledBadge
                                isActive={avatarItem.isActive}
                                overlap="circular"
                                key={avatarItem.name}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                variant="dot"
                              >
                                <Avatar
                                  src={avatarItem.avatar}
                                  style={{
                                    border: `2px solid ${avatarItem.color}`,
                                    background: '#DEDEE3',
                                  }}
                                />
                              </StyledBadge>
                            );
                          })}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell align="right" className="text-base">
                        <IconButton onClick={() => handleEditEmployee(row)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton className="bg-[#FFEBEF] hover:bg-[#FFEBEF]">
                          <CloseIcon
                            fontSize="small"
                            className="text-[#DA2036] "
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 5]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>{' '}
        {/* Drawer add pay structure */}
        <Drawer
          anchor="right"
          open={openAddDrawer}
          onClose={handleCloseAddDrawer}
        >
          {/* <EditEmployee
            handleCloseDrawer={handleCloseDrawer}
            selectedEmployee={selectedEmployee}
          /> */}
          <DrawerAddPayStructure handleCloseDrawer={handleCloseAddDrawer} />
        </Drawer>
      </div>
    </>
  );
};

export default PayStructure;
