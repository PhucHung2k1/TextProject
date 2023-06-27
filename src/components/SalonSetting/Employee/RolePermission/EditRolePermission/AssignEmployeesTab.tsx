import {
  Avatar,
  Badge,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import { getEmployeeList } from '@/store/employee/employeeAction';
import { setAddRemoveMultiRoleEmployee } from '@/store/customerRole/customerRoleSlice';
import { sxCheckBoxBlack } from '@/utils/helper/styles';

interface Props {
  idRole: any;
}

const AssignEmployees = ({ idRole }: Props) => {
  const listAllRole = useAppSelector(
    (state) => state.customerRoleSlice.listRole
  );
  const employeesList = useAppSelector(
    (state) => state.employeeSlice.employees
  );

  const [addedEmployeeList, setAddedEmployeeList] = useState<string[]>([]);
  const [removedEmployeeList, setRemovedEmployeeList] = useState<string[]>([]);
  const [valueSearchEmployee, setValueSearchEmployee] = useState<string>('');
  const [selectedEmployee, setSelectEmployee] = useState<string[]>(
    listAllRole
      .find((role) => role.Id === idRole)
      ?.Employees.map((emp) => emp.Id) || []
  );

  const [selectAll, setSelectAll] = useState<boolean>(
    selectedEmployee.length === employeesList.length
  );

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

  /**
   * Handles the checkbox value change.
   * If the id is not in the selected list, add it to the added employees list
   * if value is true, or remove it from the added employees list if value is false.
   * If the id is already in the selected list, add it to the removed employees list
   * if value is false, or remove it from the removed employees list if value is true.
   *
   * @param {boolean} isChecked - the new value of the checkbox
   * @param {string} id - the id of the employee
   */
  const handleCheckBox = (isChecked: boolean, id: string): void => {
    const isSelected = selectedEmployee.includes(id);

    if (isChecked) {
      setSelectEmployee((prevList) => [...prevList, id]);
    } else {
      setSelectEmployee((prevList) => prevList.filter((item) => item !== id));
    }

    if (!isSelected) {
      if (isChecked) {
        setAddedEmployeeList((prevList) => [...prevList, id]);
      } else {
        setAddedEmployeeList((prevList) =>
          prevList.filter((item) => item !== id)
        );
      }
    } else if (!isChecked) {
      setRemovedEmployeeList((prevList) => [...prevList, id]);
    } else {
      setRemovedEmployeeList((prevList) =>
        prevList.filter((item) => item !== id)
      );
    }
  };
  const handleSelectAll = (value: boolean) => {
    employeesList.map((emp) => handleCheckBox(value, emp.Id));
    setSelectAll(value);
  };
  const handleSearchEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearchEmployee(e.target.value);
  };
  useEffect(() => {
    dispatch(
      setAddRemoveMultiRoleEmployee({
        roleId: idRole,
        data: {
          AddedEmployeeIds: addedEmployeeList,
          RemovedEmployeeIds: removedEmployeeList,
        },
      })
    );
  }, [JSON.stringify(addedEmployeeList), JSON.stringify(removedEmployeeList)]);
  useEffect(() => {
    dispatch(getEmployeeList({}));
  }, []);

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
          onChange={handleSearchEmployee}
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
              <Checkbox
                sx={sxCheckBoxBlack}
                className="p-0"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
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
          {employeesList
            .filter(
              (emp) =>
                emp.FirstName.toUpperCase().includes(
                  valueSearchEmployee.toUpperCase()
                ) ||
                emp.LastName.toUpperCase().includes(
                  valueSearchEmployee.toUpperCase()
                )
            )
            .map((item) => {
              const checked = selectedEmployee.some((id) => id === item.Id);

              return (
                <TableRow key={item.Id} className="h-full ">
                  <TableCell className="w-[2%]">
                    <FormControlLabel
                      sx={{
                        '&.MuiCheckbox-root': {
                          color: '#404044',
                          background: '#404044',
                        },
                        '&.Mui-checked': {
                          color: '#404044',
                        },
                      }}
                      control={
                        <Checkbox
                          color="default"
                          // defaultChecked={checked}
                          checked={checked}
                          onChange={(e) =>
                            handleCheckBox(e.target.checked, item.Id)
                          }
                        />
                      }
                      label=""
                    />
                  </TableCell>
                  <TableCell className="w-[45%] pl-0">
                    <StyledBadge
                      isActive={item.IsWorking ?? false}
                      overlap="circular"
                      key={item.Id}
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
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default AssignEmployees;
