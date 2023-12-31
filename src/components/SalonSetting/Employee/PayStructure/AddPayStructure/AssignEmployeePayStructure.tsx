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

import { sxCheckBoxBlack } from '@/utils/helper/styles';
import { setAddRemoveMultiPayStructureEmployee } from '@/store/payStructure/payStructureSlice';
import { urlImage } from '@/utils/helper/url_image';

const AssignEmployeePayStructure = () => {
  const idPayStructure = useAppSelector(
    (state) => state.payStructureSlice.idPayStructureAssignEmployee
  );
  const listPayStructure = useAppSelector(
    (state) => state.payStructureSlice.listPayStructure
  );
  const employeesList = useAppSelector(
    (state) => state.employeeSlice.employees
  );
  const selectedInit =
    listPayStructure
      .find((role) => role.Id === idPayStructure)
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
      const updatedSelectedEmployees = selectedEmployees.filter(
        (id) => id !== employeeId
      );
      setSelectedEmployees(updatedSelectedEmployees);
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };
  const handleSelectAll = (value: boolean) => {
    const empListID = employeesList.map((emp) => emp.Id);
    if (value) {
      setSelectedEmployees(empListID);
    } else {
      setSelectedEmployees([]);
    }
  };
  const handleSearchEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearchEmployee(e.target.value);
  };

  useEffect(() => {
    const removeListId = selectedInit.filter(
      (item) => !selectedEmployees.includes(item)
    );
    const addedListId = selectedEmployees.filter(
      (employee) => !selectedInit.includes(employee)
    );
    setAddedEmployees(addedListId);
    setRemovedEmployees(removeListId);
  }, [JSON.stringify(selectedEmployees)]);

  useEffect(() => {
    // Set Payload for add remove to redux
    dispatch(
      setAddRemoveMultiPayStructureEmployee({
        payStructureId: idPayStructure,
        data: {
          AddedEmployeeIds: addedEmployees,
          RemovedEmployeeIds: removedEmployees,
        },
      })
    );
  }, [JSON.stringify(addedEmployees), JSON.stringify(removedEmployees)]);
  useEffect(() => {
    // Reset list remove, added after call api
    setAddedEmployees([]);
    setRemovedEmployees([]);
  }, [
    JSON.stringify(
      listPayStructure
        .find((role) => role.Id === idPayStructure)
        ?.Employees.map((emp) => emp.Id)
    ),
  ]);

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
                <TableRow key={item.CustomerId} className="h-full ">
                  <TableCell className="w-[2%]">
                    <FormControlLabel
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
                          urlImage + item.ProfilePictureUrl ??
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

export default AssignEmployeePayStructure;
