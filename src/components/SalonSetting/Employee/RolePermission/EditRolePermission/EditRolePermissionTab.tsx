import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  deleteRoleMultipeEmployee,
  getEmployeeList,
  updateRoleMultipeEmployee,
} from '@/store/employee/employeeAction';
import type { IEmployee } from '@/services/employee.service/employee.interface';

interface Props {
  idRole: any;
  selected: string[];
  handleCloseDrawer: any;
}

const EditRolePermissionTab = ({
  idRole,
  selected,
  handleCloseDrawer,
}: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState(true);

  const employeesList = useAppSelector(
    (state) => state.employeeSlice.employees
  );

  const [listData, setListData] = useState<IEmployee[]>(employeesList);
  const dispatch = useAppDispatch();

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

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = listData.map((item) => item.CustomerId);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };
  const handleRowSelection = (rowId: string) => {
    if (selectedItems.includes(rowId)) {
      setSelectedItems(selectedItems.filter((id) => id !== rowId));
    } else {
      setSelectedItems([...selectedItems, rowId]);
    }
  };

  const handleOnSave = () => {
    const saveData = {
      roleId: idRole,
      data: selectedItems,
    };
    const listRemove = listData.filter(
      (item) => !selectedItems.includes(item.CustomerId)
    );
    const listRemoveCusId = listRemove.map((item) => item.Id);
    const removeEmpId = selected.filter((item) =>
      listRemoveCusId.includes(item)
    );
    const removeCus = listData.filter((item) => removeEmpId.includes(item.Id));
    const removeCusId = removeCus.map((item) => item.CustomerId);
    const removeData = {
      roleId: idRole,
      data: removeCusId,
    };
    dispatch(updateRoleMultipeEmployee(saveData));
    dispatch(deleteRoleMultipeEmployee(removeData));
  };

  useEffect(() => {
    dispatch(getEmployeeList({})).then((res: any) => {
      setListData(res.payload);
      const selectCustomer = listData.filter((item) =>
        selected.includes(item.Id)
      );
      const selectCustomerId = selectCustomer.map((item) => item.CustomerId);
      setSelectedItems(selectCustomerId);
    });
  }, []);

  useEffect(() => {
    if (selectedItems.length === 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [selectedItems]);
  const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
      color: #404044;
    }

    &.Mui-checked {
      color: #404044;
    }
  `;
  return (
    <>
      <FormControl
        className="w-full "
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
          className="mt-[35px] h-[48px] w-full bg-mango-gray-light-5"
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            placeholder: 'Search employee......',
          }}
        />
      </FormControl>
      <Table className="mt-3 ">
        <TableHead>
          <TableRow>
            <TableCell className="pb-[7px]  text-mango-text-gray-2">
              <StyledCheckbox
                className="p-0"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell className="pb-[7px] pl-0 text-[14px] text-mango-text-gray-2">
              Employee
            </TableCell>
            <TableCell className="pb-[7px] pl-0  text-[14px] text-mango-text-gray-2">
              Job Title
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((item) => (
            <TableRow key={item.CustomerId}>
              <TableCell className="w-[2%]">
                <StyledCheckbox
                  className="p-0"
                  checked={selectedItems.includes(item.CustomerId)}
                  onChange={() => handleRowSelection(item.CustomerId)}
                />
              </TableCell>
              <TableCell className="w-[45%] pl-0">
                {' '}
                <StyledBadge
                  isActive={item.IsWorking ?? false}
                  overlap="circular"
                  key={item.CustomerId}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar
                    src={
                      item.ProfilePictureUrl ??
                      '/assets/images/RolePermission/4.svg'
                    }
                    style={{
                      border: `2px solid  ${'#2596be'}`,
                      background: '#DEDEE3',
                    }}
                  />
                </StyledBadge>
                <span className="pl-[8px] text-[16px] text-primary-dark">
                  {`${item.FirstName} ${item.LastName} ${
                    item.NickName !== '' ? `(${item.NickName})` : ''
                  }`}
                </span>
              </TableCell>
              <TableCell className="pl-0 text-[16px] text-primary-dark">
                {item.JobTitle}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid xs={12} item className="mt-8">
        <Stack direction="row" spacing={2}>
          <Grid xs={6} item>
            <Button
              type="submit"
              className="h-12 w-[354px] border-mango-gray-light-3 text-[16px] font-bold capitalize text-mango-text-gray-2 hover:border-mango-gray-light-3 "
              variant="outlined"
              onClick={handleCloseDrawer}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid xs={6} item>
            <Button
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold  uppercase text-white hover:bg-primary-main"
              variant="contained"
              type="submit"
              disabled={isCheck}
              onClick={handleOnSave}
            >
              Save
            </Button>
          </Grid>
        </Stack>
      </Grid>
    </>
  );
};

export default EditRolePermissionTab;
