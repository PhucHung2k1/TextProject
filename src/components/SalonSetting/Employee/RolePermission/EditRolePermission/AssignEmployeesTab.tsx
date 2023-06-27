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
  const selectedInit =
    listAllRole
      .find((role) => role.Id === idRole)
      ?.Employees.map((emp) => emp.Id) || [];
  const [addedEmployees, setAddedEmployees] = useState<string[]>([]);
  const [removedEmployees, setRemovedEmployees] = useState<string[]>([]);
  const [valueSearchEmployee, setValueSearchEmployee] = useState<string>('');
  const [selectedEmployees, setSelectedEmployees] =
    useState<string[]>(selectedInit);

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

  const handleEmployeeToggle = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      // Nếu nhân viên đã được chọn, bỏ khỏi mảng selectedEmployees và kiểm tra và xoá trong mảng removedEmployees nếu cần
      const updatedSelectedEmployees = selectedEmployees.filter(
        (id) => id !== employeeId
      );
      setSelectedEmployees(updatedSelectedEmployees);

      if (removedEmployees.includes(employeeId)) {
        // Nếu ID cũng tồn tại trong mảng removedEmployees, xoá khỏi cả mảng removedEmployees và addedEmployees
        const updatedRemovedEmployees = removedEmployees.filter(
          (id) => id !== employeeId
        );
        setRemovedEmployees(updatedRemovedEmployees);

        const updatedAddedEmployees = addedEmployees.filter(
          (id) => id !== employeeId
        );
        setAddedEmployees(updatedAddedEmployees);
      }
    } else {
      // Nếu nhân viên chưa được chọn, kiểm tra xem có trong mảng removedEmployees không
      const isPreviouslyRemoved = removedEmployees.includes(employeeId);
      if (isPreviouslyRemoved) {
        // Nếu nhân viên đã được chọn trước đó nhưng bị bỏ chọn, bỏ khỏi mảng removedEmployees và addedEmployees
        const updatedRemovedEmployees = removedEmployees.filter(
          (id) => id !== employeeId
        );
        setRemovedEmployees(updatedRemovedEmployees);

        const updatedAddedEmployees = addedEmployees.filter(
          (id) => id !== employeeId
        );
        setAddedEmployees(updatedAddedEmployees);
      } else if (
        !addedEmployees.includes(employeeId) &&
        !selectedEmployees.includes(employeeId)
      ) {
        // Nếu nhân viên chưa được chọn trước đó, không có trong mảng addedEmployees và không có trong mảng selectedEmployees, thêm vào mảng addedEmployees
        setAddedEmployees([...addedEmployees, employeeId]);
      }
      // Thêm nhân viên vào mảng selectedEmployees
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };
  const handleSelectAll = (value: boolean) => {
    const empList = employeesList.map((emp) => emp.Id);
    if (value) {
      setAddedEmployees(empList);
      setRemovedEmployees([]);
      setSelectedEmployees(empList);
    } else {
      setAddedEmployees([]);
      setRemovedEmployees(empList);
      setSelectedEmployees([]);
    }
  };
  const handleSearchEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearchEmployee(e.target.value);
  };
  useEffect(() => {
    // Set Payload for add remove to redux
    dispatch(
      setAddRemoveMultiRoleEmployee({
        roleId: idRole,
        data: {
          AddedEmployeeIds: addedEmployees,
          RemovedEmployeeIds: removedEmployees,
        },
      })
    );
  }, [JSON.stringify(addedEmployees), JSON.stringify(removedEmployees)]);

  useEffect(() => {
    // Reset list remove, added after call api
    setRemovedEmployees([]);
    setAddedEmployees([]);
  }, [
    JSON.stringify(
      listAllRole
        .find((role) => role.Id === idRole)
        ?.Employees.map((emp) => emp.Id)
    ),
  ]);
  console.log('add', addedEmployees, 'remove', removedEmployees);

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
                checked={selectedEmployees.length === employeesList.length}
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
            .filter((emp) =>
              `${emp.FirstName} ${emp.LastName}`
                .toUpperCase()
                .includes(valueSearchEmployee.toUpperCase())
            )
            .map((item) => {
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
                          checked={selectedEmployees.includes(item.Id)}
                          onChange={() => handleEmployeeToggle(item.Id)}
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
