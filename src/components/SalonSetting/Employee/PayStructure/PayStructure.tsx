import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
// eslint-disable-next-line import/no-cycle
import { sxSelect } from '@/utils/helper/styles';
import { squareIconButtonStyles } from '@/helper/styleButton';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import type { IPayStructureData } from '@/services/payStructure.service/payStructure.interface';
import {
  getListPayStructure,
  deletePayStructure,
} from '@/store/payStructure/payStructureAction';
import { showDrawerPayStructure } from '@/store/common/commonSlice';

import ModalCustomDelete from '@/components/Modal/ModalCustomDelete';

// eslint-disable-next-line import/no-cycle

const arrPayStructureType = [
  'CommissionGuarantee',
  'Commission',
  'Salary',
  'Hourly',
];

const arrEmployee = ['A', 'B', 'C', 'D'];
const PayStructure = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openModal, setOpenModal] = useState<boolean>(false);
  // Filter State
  const [filterPayType, setFilterPayType] = useState('');

  const [filterEmployee, setFilterEmployee] = useState('');

  // Selected Employee
  const [selectedPayStructure, setSelectedPayStructure] =
    useState<IPayStructureData>();

  const dispatch = useAppDispatch();

  const payStructureList = useAppSelector(
    (state) => state.payStructureSlice.listPayStructure
  );

  // Open and close drawer add paystructure
  const handleOpenAddDrawer = () => {
    dispatch(showDrawerPayStructure());
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // Handle Filter
  const handleFilterPayType = (event: any) => {
    setFilterPayType(event.target.value as string);
  };

  const handleFilterEmployee = (event: any) => {
    setFilterEmployee(event.target.value as string);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, payStructureList.length);

  // Filter data list
  const filteredData: IPayStructureData[] = payStructureList.filter((row) => {
    if (filterPayType !== '' && filterEmployee !== '') {
      return true;
      // row.Name.toLowerCase().includes(filterPayType.toLowerCase()) &&
      // row.Employees.some(
      //   (employee) =>
      //     (employee.FirstName || employee.LastName) &&
      //     (employee.FirstName.toLowerCase().includes(
      //       filterEmployee.toLowerCase()
      //     ) ||
      //       employee.LastName.toLowerCase().includes(
      //         filterEmployee.toLowerCase()
      //       ))
      // )
    }
    if (filterPayType !== '') {
      return row.Type.toLowerCase().includes(filterPayType.toLowerCase());
    }
    if (filterEmployee !== '') {
      return true;
      // row.Employees.some(
      //   (employee) =>
      //     (employee.FirstName || employee.LastName) &&
      //     (employee.FirstName.toLowerCase().includes(
      //       filterEmployee.toLowerCase()
      //     ) ||
      //       employee.LastName.toLowerCase().includes(
      //         filterEmployee.toLowerCase()
      //       ))
      // );
    }
    return true;
  });
  // Open and clos drawer

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
  const handleDeleteButton = (item: any) => {
    setOpenModal(true);
    setSelectedPayStructure(item);
    // handleOpenDrawer();
    // setSelectedEmployee(item);
  };
  const handleDeletePayStructure = () => {
    if (selectedPayStructure) {
      dispatch(deletePayStructure(selectedPayStructure?.Id));
    }
    handleCloseModal();
  };

  const handleEditPayStructure = (item: IPayStructureData) => {
    console.log('item', item.Id);

    handleOpenAddDrawer();
    setSelectedPayStructure(item);
  };

  useEffect(() => {
    dispatch(getListPayStructure({}));
  }, []);

  return (
    <>
      <ModalCustomDelete
        onClose={() => setOpenModal(false)}
        open={openModal}
        onCancel={handleCloseModal}
        onSubmit={handleDeletePayStructure}
        titleModal="Remove Pay Structure?"
        subTitle={`  Would you like to remove "${selectedPayStructure?.Name}"?`}
        textButtonCancel="No, Cancel"
        textButtonSubmit="Yes, Delete it"
      />
      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <div className="flex h-20 w-full items-center gap-6 rounded-sm bg-bg-light px-4 py-7 ">
              <Button
                className="h-[40px]  bg-white px-5 text-sm font-semibold text-primary-main hover:bg-white"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDrawer}
              >
                New Pay Structure
              </Button>
              <FormControl variant="outlined" size="small" className="w-[15%]">
                <Select
                  sx={sxSelect}
                  displayEmpty
                  value={filterPayType}
                  input={<OutlinedInput />}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="bg-white"
                  onChange={handleFilterPayType}
                >
                  <MenuItem value="">
                    <p>Pay structure type</p>
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
                  sx={sxSelect}
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
            <Paper
              sx={{
                width: '100%',
                overflow: 'auto',
                maxHeight: '560px',
                boxShadow: 'none',
                marginTop: '10px',
              }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                className="overflow-auto"
              >
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
                    <TableRow key={row.Id}>
                      <TableCell
                        component="td"
                        scope="row"
                        className="text-base"
                      >
                        {row.Name}
                      </TableCell>
                      <TableCell
                        component="td"
                        scope="row"
                        className="text-base"
                      >
                        <Chip
                          className="  bg-pink-50 px-1 text-base  text-pink-500"
                          label={row.Type}
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
                        {row.Employees.length} users
                        <AvatarGroup max={5} className="mt-[4px] justify-end">
                          {row.Employees.map((avatarItem) => {
                            return (
                              <StyledBadge
                                isActive
                                overlap="circular"
                                key={`${avatarItem.FirstName} ${avatarItem.LastName}`}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                variant="dot"
                              >
                                <Avatar
                                  src={
                                    avatarItem.ProfilePictureUrl ??
                                    '/assets/images/RolePermission/4.svg'
                                  }
                                  style={{
                                    border: `2px solid ${'#fff'}`,
                                    background: '#DEDEE3',
                                  }}
                                />
                              </StyledBadge>
                            );
                          })}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell align="right" className="text-base">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton
                            className="bg-bg-light"
                            onClick={() => handleEditPayStructure(row)}
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
                            onClick={() => handleDeleteButton(row)}
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
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PayStructure;
