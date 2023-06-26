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
  MenuItem,
  Grid,
  Stack,
  Chip,
  Avatar,
  AvatarGroup,
  styled,
  Tooltip,
  TablePagination,
  Drawer,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getAllRole } from '@/store/customerRole/customerRoleAction';
import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import ModalCustomContainer from '@/components/Modal/ModalCustom';
import { ModalDeleteRole } from './ModalDeleteRole';
import EditRolePermission from './EditRolePermission';
import { showDrawerRolePermission } from '@/store/common/commonSlice';
import { sxSelect } from '@/utils/helper/styles';

interface PermissionItem {
  Name: string;
  SystemName: string;
  Category: string;
  Id: string;
  CreateBy: null;
  CreateDate: string;
  LastModifiedBy: null;
  LastModifiedDate: null;
}
interface Employee {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  Status: any;
  ProfilePictureUrl: string;
  Id: string;
  CreateBy: any;
  CreateDate: Date;
  LastModifiedBy: any;
  LastModifiedDate: any;
}
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
  const [openModal, setOpenModal] = useState<boolean>(false);

  const listRole = useAppSelector((state) => state.customerRoleSlice.listRole);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, listRole.length);

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
  const [selectedItem, setSelectedItem] = useState<IAllCustomerRole>();
  const [selectedListEmp, setSelectedListEmp] = useState<string[]>([]);
  const listEmployee = listRole.reduce((acc: any, role: IAllCustomerRole) => {
    return [...acc, ...role.Employees];
  }, []);
  const listFunction = listRole.reduce((acc: any, role: IAllCustomerRole) => {
    return [...acc, ...role.Permissions];
  }, []);
  const dispatch = useAppDispatch();
  const [filterFunction, setfilterFunction] = useState('');
  const [filterEmployee, setFiterEmployee] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpenDrawer = (item: IAllCustomerRole) => {
    setSelectedItem(item);
    const listEmp = item.Employees.map((emp) => emp.Id);
    setSelectedListEmp(listEmp);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  const handlefilterFunction = (event: any) => {
    setfilterFunction(event.target.value as string);
  };
  const handleFilterEmployee = (event: any) => {
    setFiterEmployee(event.target.value as string);
  };

  const handleFilterData = () => {
    let filteredData = listRole;

    if (filterEmployee !== '') {
      filteredData = filteredData.filter((row) => {
        const filteredEmployees = row.Employees.filter(
          (employee) => employee.Id === filterEmployee
        );

        return filteredEmployees.length > 0;
      });
    }

    if (filterFunction !== '') {
      filteredData = filteredData.filter((row) => {
        const hasSelectedPermission = row.Permissions.some(
          (permission) => permission.Id === filterFunction
        );

        return hasSelectedPermission;
      });
    }

    return filteredData;
  };
  const dataFilterd = handleFilterData();

  useEffect(() => {
    dispatch(getAllRole({}));
  }, []);

  const handleDeleteRole = (item: any) => {
    setSelectedItem(item);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalCustomContainer
        onClose={() => setOpenModal(false)}
        open={openModal}
        modalContent={
          <ModalDeleteRole
            item={selectedItem}
            handleCloseModal={handleCloseModal}
          />
        }
      />

      <div className="min-h-screen">
        <div className="mt-[36px] flex items-center justify-between">
          <Typography
            variant="h2"
            component="h2"
            className="text-[32px] font-semibold text-text-title"
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
              className="h-[48px] w-[188px] bg-primary-main text-[16px] font-bold text-white hover:bg-button-hover-cyan"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => dispatch(showDrawerRolePermission())}
            >
              Add Role
            </Button>

            <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-mango-gray-light-3  hover:bg-[#5C5D6A29]">
              <MoreHorizIcon />
            </div>
          </div>
        </div>
        <div className="h-[80px] w-full bg-[##F3F4F6] ">
          <Grid xs={12} item>
            <div className=" mt-[24px] flex h-[80px] w-full items-center gap-6 rounded-sm bg-mango-gray-light-5 py-7 pl-[16px] pr-4 ">
              <FormControl
                variant="outlined"
                size="small"
                className="w-[20%]"
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
                  sx={sxSelect}
                  displayEmpty
                  value={filterEmployee}
                  input={<OutlinedInput />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                  onChange={handleFilterEmployee}
                >
                  <MenuItem value="">
                    <p>All Employee</p>
                  </MenuItem>
                  {listEmployee.map((name: Employee) => (
                    <MenuItem key={name.Id} value={name.Id}>
                      {name.FirstName} {name.LastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                size="small"
                className="w-[20%]"
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
                  sx={sxSelect}
                  displayEmpty
                  value={filterFunction}
                  input={<OutlinedInput />}
                  onChange={handlefilterFunction}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                >
                  <MenuItem value="">
                    <p>All Function</p>
                  </MenuItem>
                  {listFunction.map((name: PermissionItem) => (
                    <MenuItem key={name.Id} value={name.Id}>
                      {name.Category}
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
                  <TableCell className="pb-[7px]  text-mango-text-gray-2">
                    ROLE
                  </TableCell>
                  <TableCell
                    className="pb-[7px]  text-mango-text-gray-2"
                    align="left"
                  >
                    EMPLOYEE
                  </TableCell>
                  <TableCell
                    className="pb-[7px]  text-mango-text-gray-2"
                    align="left"
                  >
                    ACCESSIBILITY
                  </TableCell>
                  <TableCell
                    className="pb-[7px] text-mango-text-gray-2"
                    align="left"
                  />
                </TableRow>
              </TableHead>
              <TableBody className="text-[16px]">
                {filterEmployee !== '' || filterFunction !== ''
                  ? dataFilterd.slice(startIndex, endIndex).map((item) => {
                      return (
                        <TableRow
                          className="align-top text-[16px]"
                          key={item.Id}
                        >
                          <TableCell
                            component="td"
                            scope="row"
                            className="w-[15%] text-[16px]"
                          >
                            {item.Name}
                          </TableCell>
                          <TableCell
                            component="td"
                            scope="row"
                            className="w-[20%] text-base"
                          >
                            {filterEmployee !== ''
                              ? item.Employees.filter(
                                  (filter) => filter.Id === filterEmployee
                                ).length
                              : item.Employees.length}
                            {item.Employees.length < 2 ? ' user' : ' users'}
                            {item.Employees.length > 0 && (
                              <AvatarGroup
                                max={5}
                                className="mt-[4px] justify-end"
                              >
                                {filterEmployee !== ''
                                  ? item.Employees.filter(
                                      (avt) => avt.Id === filterEmployee
                                    ).map((avatarItem) => (
                                      <Tooltip
                                        title={`${avatarItem.FirstName} ${avatarItem.LastName}`}
                                        key={avatarItem.Id}
                                      >
                                        <StyledBadge
                                          isActive={avatarItem.Status}
                                          overlap="circular"
                                          key={avatarItem.Id}
                                          anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                          }}
                                          variant="dot"
                                        >
                                          <Avatar
                                            src={avatarItem.ProfilePictureUrl}
                                            style={{
                                              border: `2px solid #9B9BA0`,
                                              background: '#DEDEE3',
                                            }}
                                          />
                                        </StyledBadge>
                                      </Tooltip>
                                    ))
                                  : item.Employees.map((avatarItem) => (
                                      <Tooltip
                                        title={`${avatarItem.FirstName} ${avatarItem.LastName}`}
                                        key={avatarItem.Id}
                                      >
                                        <StyledBadge
                                          isActive={avatarItem.Status}
                                          overlap="circular"
                                          key={avatarItem.Id}
                                          anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                          }}
                                          variant="dot"
                                        >
                                          <Avatar
                                            src={avatarItem.ProfilePictureUrl}
                                            style={{
                                              border: `2px solid #9B9BA0`,
                                              background: '#DEDEE3',
                                            }}
                                          />
                                        </StyledBadge>
                                      </Tooltip>
                                    ))}
                              </AvatarGroup>
                            )}
                          </TableCell>
                          <TableCell
                            component="td"
                            scope="row"
                            className="w-[55%]"
                          >
                            {item.Permissions.length} functions
                            <div>
                              <Stack direction="row" flexWrap="wrap">
                                {item.Permissions.map((itemPermission) => (
                                  <Chip
                                    key={itemPermission.Id}
                                    className="float-right mr-2 mt-2 bg-blue-50 px-[10px] py-[7px] text-[16px] font-normal text-blue-700"
                                    label={itemPermission.Category}
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
                          <TableCell
                            align="right"
                            className="w-[10%] text-[16px]"
                          >
                            <IconButton>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              className="bg-[#FFEBEF] hover:bg-[#FFEBEF]"
                              onClick={() => handleDeleteRole(item)}
                            >
                              <CloseIcon
                                fontSize="small"
                                className="text-[#DA2036] "
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : listRole.slice(startIndex, endIndex).map((item) => {
                      return (
                        <TableRow
                          className="align-top text-[16px]"
                          key={item.Id}
                        >
                          <TableCell
                            component="td"
                            scope="row"
                            className="w-[15%] text-[16px]"
                          >
                            {item.Name}
                          </TableCell>
                          <TableCell
                            component="td"
                            scope="row"
                            className="w-[20%] text-base"
                          >
                            {item.Employees.length}
                            {item.Employees.length < 2 ? ' user' : ' users'}
                            {item.Employees.length > 0 && (
                              <AvatarGroup
                                max={5}
                                className="mt-[4px] justify-end"
                              >
                                {item.Employees.map((avatarItem) => (
                                  <Tooltip
                                    title={`${avatarItem.FirstName} ${avatarItem.LastName}`}
                                    key={avatarItem.Id}
                                  >
                                    <StyledBadge
                                      isActive={avatarItem.Status}
                                      overlap="circular"
                                      key={avatarItem.Id}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                      }}
                                      variant="dot"
                                    >
                                      <Avatar
                                        src={avatarItem.ProfilePictureUrl}
                                        style={{
                                          border: `2px solid #9B9BA0`,
                                          background: '#DEDEE3',
                                        }}
                                      />
                                    </StyledBadge>
                                  </Tooltip>
                                ))}
                              </AvatarGroup>
                            )}
                          </TableCell>
                          <TableCell
                            component="td"
                            scope="row"
                            className="w-[55%]"
                          >
                            {item.Permissions.length} functions
                            <div>
                              <Stack direction="row" flexWrap="wrap">
                                {item.Permissions.map((itemPermission) => (
                                  <Chip
                                    key={itemPermission.Id}
                                    className="float-right mr-2 mt-2 bg-blue-50 px-[10px] py-[7px] text-[16px] font-normal text-blue-700"
                                    label={itemPermission.Category}
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
                          <TableCell
                            align="right"
                            className="w-[10%] text-[16px]"
                          >
                            <IconButton onClick={() => handleOpenDrawer(item)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              className="bg-[#FFEBEF] hover:bg-[#FFEBEF]"
                              onClick={() => handleDeleteRole(item)}
                            >
                              <CloseIcon
                                fontSize="small"
                                className="text-[#DA2036] "
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 15]}
              component="div"
              count={listRole.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Drawer anchor="right" open={open} onClose={handleCloseDrawer}>
              <EditRolePermission
                idRole={selectedItem?.Id}
                selected={selectedListEmp}
              />
            </Drawer>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ListRolePermission;
