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
import {
  deleteEmployee,
  getEmployeeDetail,
  getEmployeeList,
  getEmployeeListSearch,
} from '@/store/employee/employeeAction';
import type { IEmployee } from '@/services/employee.service/employee.interface';
import ModalCustomDelete from '@/components/Modal/ModalCustomDelete';

function getStyles(name: string, personName: string[]) {
  return {
    color: personName.indexOf(name) === -1 ? 'black' : '#0057B2',
  };
}
const arrStatus = ['Active', 'Inactive'];
const EmployeeList = () => {
  const employeesList = useAppSelector(
    (state) => state.employeeSlice.employees
  );
  const employeesSearch = useAppSelector(
    (state) => state.employeeSlice.employeesSearch
  );
  console.log(
    '🚀 ~ file: EmployeeList.tsx:53 ~ EmployeeList ~ employeesSearch:',
    employeesSearch
  );

  const valueSearchNameRedux = useAppSelector(
    (state) => state.employeeSlice.valueSearchName
  );

  const [employees, setEmployees] = useState(employeesList);
  console.log(
    '🚀 ~ file: EmployeeList.tsx:63 ~ EmployeeList ~ employees:',
    employees
  );

  const arrRolePermission = [
    ...new Set(
      employees.flatMap((employee) => employee.Roles.map((role) => role.Id))
    ),
  ].map((roleId) => {
    const role = employees
      .flatMap((employee) => employee.Roles)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .find((role: any) => role.Id === roleId);
    return { Id: role?.Id, Name: role?.Name };
  });
  const arrPayStructures = employees
    .flatMap((employee) =>
      employee.PayStructure ? [employee?.PayStructure?.Name] : []
    )
    .filter((value, index, self) => self.indexOf(value) === index);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  console.log('🚀 ~ file: EmployeeList.tsx:71 ~ EmployeeList ~ page:', page);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showAllPermission, setShowAllPermission] = useState(false);

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

  const [filterRolePermission, setFilterRolePermission] = useState<string[]>(
    []
  );
  console.log(
    '🚀 ~ file: EmployeeList.tsx:123 ~ EmployeeList ~ filterRolePermission:',
    filterRolePermission
  );
  const handleFilterPayStructures = (event: any) => {
    setFilterPayStructures(event.target.value as string);
  };

  const handleFilterStatus = (event: any) => {
    setFilterStatus(event.target.value as string);
  };

  const handleFilterRolePermissionChange = (event: any) => {
    console.log(
      '🚀 ~ file: EmployeeList.tsx:130 ~ handleFilterRolePermissionChange ~ t:',
      event
    );
    const {
      target: { value },
    } = event;
    setFilterRolePermission(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const filteredData = employees.filter((row) => {
    const fullName = `${row.FirstName} ${row.LastName}`.toLowerCase();
    if (
      (filterStatus === '' ||
        (filterStatus === 'Active' && row.Status) ||
        (filterStatus === 'Inactive' && !row.Status)) &&
      (filterPayStructures === '' ||
        (row.PayStructure &&
          row.PayStructure.Name.toLowerCase().includes(
            filterPayStructures.toLowerCase()
          ))) &&
      // (filterRolePermission === '' ||
      //   row.Roles.some((role) =>
      //     role.Name.toLowerCase().includes(filterRolePermission.toLowerCase())
      //   )) &&
      (valueSearchNameRedux === '' ||
        fullName.includes(valueSearchNameRedux.toLowerCase()))
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
    console.log(
      '🚀 ~ file: EmployeeList.tsx:152 ~ handleEditEmployee ~ item:',
      item
    );
    handleOpenDrawer();
    setSelectedEmployee(item);

    dispatch(getEmployeeDetail(item?.Id));
  };
  const handleDeleteEmployee = (item: any) => {
    setOpenModal(true);
    setSelectedEmployee(item);
    // handleOpenDrawer();
    // setSelectedEmployee(item);
  };

  const handleSwitchChange = (id: any) => {
    setEmployees((prevEmployees) => {
      return prevEmployees.map((employee) => {
        if (employee.Id === id) {
          return {
            ...employee,
            status: !employee.Status,
          };
        }
        return employee;
      });
    });
  };
  useEffect(() => {
    dispatch(getEmployeeList({}));
  }, []);

  useEffect(() => {
    const body = {
      PageIndex: page + 1,
      PageSize: rowsPerPage,
      OrderBy: '-Id',
      Condition: {
        SearchText: 'Hung',
        Status: true,
        PayStructureId: '',
        RoleIds: [
          '423a7728-bec3-4203-98f6-0b1894ab1bc8',
          'b54e6981-8bd6-47b8-865b-b4761278d5d6',
        ],
      },
      Fields: '*',
      ViewMode: 'Grid',
      Cache: true,
    };

    dispatch(getEmployeeListSearch(body));
  }, [rowsPerPage, page]);

  useEffect(() => {
    setEmployees(employeesList);
  }, [employeesList]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteEmployeeModal = () => {
    dispatch(deleteEmployee(selectedEmployee?.Id)).then((res) => {
      if (res) {
        handleCloseModal();
      }
    });
  };
  const handleRenderItemPermission = (item: IEmployee) => {
    return (
      <>
        {!showAllPermission ? (
          <>
            {item.Roles.slice(0, 1).map((itemPermission: any) => (
              <Chip
                key={`${Math.random()}`}
                label={itemPermission?.Name}
                className="bg-blue-50 px-1 text-[16px] text-blue-700"
              />
            ))}
            {item.Roles.slice(1).length > 0 && (
              <Chip
                label={`+${item.Roles.slice(1).length}`}
                className="cursor-pointer bg-blue-50 px-1 text-[16px] text-blue-700"
                onClick={() => {
                  setShowAllPermission(!showAllPermission);
                }}
              />
            )}
          </>
        ) : (
          <>
            {item.Roles.map((itemPermission) => (
              <Chip
                key={`${Math.random()}`}
                label={itemPermission.Name}
                className="bg-blue-50 px-1 text-[16px] text-blue-700"
                onClick={() => {
                  setShowAllPermission(!showAllPermission);
                }}
              />
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <ModalCustomDelete
        onClose={() => setOpenModal(false)}
        open={openModal}
        onCancel={handleCloseModal}
        onSubmit={handleDeleteEmployeeModal}
        titleModal="Remove Employee?"
        subTitle={`  Would you like to remove "${selectedEmployee?.FirstName} ${selectedEmployee?.LastName}"?`}
        textButtonCancel="No, Cancel"
        textButtonSubmit="Yes, Delete it"
      />
      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <div className="f20 flex w-full items-center gap-6 rounded-sm bg-bg-light px-4 py-7 ">
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  sx={sxSelect}
                  displayEmpty
                  value={filterRolePermission}
                  input={<OutlinedInput />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                  onChange={handleFilterRolePermissionChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <p>All Role & Permission</p>;
                    }

                    const selectedRoles = arrRolePermission.filter(
                      (role: any) => selected.includes(role.Id)
                    );

                    return selectedRoles.map((role) => role.Name).join(', ');
                  }}
                  multiple
                >
                  <MenuItem value="" disabled>
                    <p>All Role & Permission</p>
                  </MenuItem>

                  {arrRolePermission.map((name: any) => (
                    <MenuItem
                      key={name.Id}
                      value={name.Id}
                      style={getStyles(name.Id, filterRolePermission)}
                    >
                      {name.Name}
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
                  <MenuItem value="" disabled>
                    <p>All PayStructure</p>
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
                  value={filterPayStructures}
                  input={<OutlinedInput />}
                  onChange={handleFilterPayStructures}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                >
                  <MenuItem value="" disabled>
                    <p>All Service & Product</p>
                  </MenuItem>
                  {arrPayStructures.map((name) => (
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
                maxHeight: '500px',
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
                  {filteredData.slice(startIndex, endIndex).map((row) => {
                    return (
                      <TableRow key={row.Id}>
                        <TableCell className=" text-base text-primary-dark">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <StyledBadge
                              isActive={row.Status === true}
                              overlap="circular"
                              key={row.Id}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              variant="dot"
                            >
                              <Avatar
                                src={row.ProfilePictureUrl ?? ''}
                                style={{
                                  border: `2px solid #DEDEE3`,
                                  background: '#DEDEE3',
                                }}
                              />
                            </StyledBadge>
                            <div>
                              {row.FirstName} {row.LastName} ({row.NickName})
                            </div>
                          </Stack>
                        </TableCell>
                        <TableCell className="text-base text-primary-dark">
                          {row.JobTitle}
                        </TableCell>

                        <TableCell className="text-base text-primary-dark">
                          <Stack direction="row" spacing={1}>
                            {handleRenderItemPermission(row)}
                          </Stack>
                        </TableCell>
                        <TableCell className="text-base text-primary-dark">
                          {row?.PayStructure?.Name && (
                            <Chip
                              className="  bg-pink-50 px-1 text-[16px]  text-pink-500"
                              label={row?.PayStructure?.Name ?? ''}
                              sx={{
                                '& .css-6od3lo-MuiChip-label': {
                                  overflow: 'unset',
                                },
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell className="text-base text-primary-dark">
                          <Chip
                            className="  bg-cyan-50 px-1 text-[16px]  text-cyan-700"
                            // label={row.serviceProduct}
                            label="Service and product"
                            sx={{
                              '& .css-6od3lo-MuiChip-label': {
                                overflow: 'unset',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={row.Status ?? false}
                            color="success"
                            onChange={() => handleSwitchChange(row.Id)}
                          />
                          {row.Status ? 'Active' : 'Inactive'}
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0}
                          >
                            <IconButton
                              className="bg-transparent"
                              onClick={() => handleEditEmployee(row)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>

                            <IconButton className="bg-transparent hover:bg-[#FFEBEF]">
                              <ContentCopyOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              className="bg-transparent hover:bg-[#FFEBEF]"
                              onClick={() => handleDeleteEmployee(row)}
                            >
                              <DeleteOutlineOutlinedIcon
                                fontSize="small"
                                className="text-[#DA2036] "
                              />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            <TablePagination
              rowsPerPageOptions={[10, 25]}
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
          <EditEmployee handleCloseDrawer={handleCloseDrawer} />
        </Drawer>
      </div>
    </>
  );
};

export default EmployeeList;
