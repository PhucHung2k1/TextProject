import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';

const AssignEmployee = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState(true);
  const StyledBadge = styled(Badge)<{ isActive: boolean }>(
    ({ theme, isActive }) => ({
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
    })
  );
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = items.map((item) => item.Id);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };
  const handleRowSelection = (rowId: number) => {
    if (selectedItems.includes(rowId)) {
      setSelectedItems(selectedItems.filter((id) => id !== rowId));
    } else {
      setSelectedItems([...selectedItems, rowId]);
    }
  };
  const items = [
    {
      Id: 1,
      color: '#2D9DE3',
      avatarThumb: '/assets/images/RolePermission/4.svg',
      isActive: true,
      Name: 'Lane Garraway (Lane)',
      Job: 'Technician',
    },
    {
      Id: 2,
      color: '#D03552',
      avatarThumb: '/assets/images/RolePermission/5.svg',
      isActive: true,
      Name: 'Darell Wade (Dara)',
      Job: 'Technician',
    },
    {
      Id: 3,
      color: '#00AD93',
      avatarThumb: '/assets/images/RolePermission/7.svg',
      isActive: false,
      Name: 'Maynard Cobb (May)',
      Job: 'Technician',
    },
    {
      Id: 4,
      color: '#7DB400',
      avatarThumb: '/assets/images/RolePermission/8.svg',
      isActive: true,
      Name: 'Hazel Jensen (Jen)',
      Job: 'Technician',
    },
    {
      Id: 5,
      color: '#9D46DE',
      avatarThumb: '/assets/images/RolePermission/9.svg',
      isActive: false,
      Name: 'Tabitha Ferguson (Tabi)',
      Job: 'Technician',
    },
    {
      Id: 6,
      color: '#E77A16',
      avatarThumb: '/assets/images/RolePermission/2.svg',
      isActive: true,
      Name: 'Sophie Ogley (Sophia)',
      Job: 'Manager',
    },
  ];
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
    <div className="w-[796px] border h-[95vh]  mr-[0px] ml-auto">
      <div className=" text-center pt-[24px] px-[32px]">
        <div className="flex items-center justify-center ">
          <ArrowBackIcon className="cursor-pointer text-3xl text-[#5C5D6A]" />

          <p className="mx-auto text-[32px] text-[#1F1F23] font-semibold">
            Assign Employee
          </p>
        </div>
        <FormControl
          className="w-full"
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
            className="h-[48px] w-full mt-[56px] bg-[#F3F4F6]"
            id="outlined-adornment-weight"
            startAdornment={
              <InputAdornment position="start">
                {' '}
                <SearchIcon />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              placeholder: 'Search employee......',
            }}
          />
        </FormControl>
        <Table className="mt-[30px]">
          <TableHead>
            <TableRow>
              <TableCell className="pb-[7px]  text-[#737277]">
                <StyledCheckbox
                  className="p-0"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell className="pb-[7px] pl-0 text-[#737277] text-[14px]">
                Employee
              </TableCell>
              <TableCell className="pb-[7px] pl-0  text-[#737277] text-[14px]">
                Job Title
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.Id}>
                <TableCell className="w-[2%]">
                  <StyledCheckbox
                    className="p-0"
                    checked={selectedItems.includes(item.Id)}
                    onChange={() => handleRowSelection(item.Id)}
                  />
                </TableCell>
                <TableCell className="pl-0 w-[45%]">
                  {' '}
                  <StyledBadge
                    isActive={item.isActive}
                    overlap="circular"
                    key={item.Id}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot"
                  >
                    <Avatar
                      src={item.avatarThumb}
                      style={{
                        border: `2px solid ${item.color}`,
                        background: '#DEDEE3',
                      }}
                    />
                  </StyledBadge>
                  <span className="text-[16px] text-[#404044] pl-[8px]">
                    {item.Name}
                  </span>
                </TableCell>
                <TableCell className="pl-0 text-[16px] text-[#404044]">
                  {item.Job}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" pb-[24px] pt-[4px] px-[32px] border-t border-[#DEDEE8] mt-5">
        <div className="flex justify-between ">
          <Button
            type="submit"
            className="my-4 h-12 w-[354px] font-bold text-[#737277] text-[16px] capitalize border-mango-gray-light-3 hover:border-mango-gray-light-3 "
            variant="outlined"
          >
            CANCEL
          </Button>
          <Button
            className="my-4 h-12 w-[354px] bg-mango-primary-blue font-bold text-[16px] capitalize hover:bg-[#00ADC3]"
            variant="contained"
            type="submit"
            disabled={isCheck}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignEmployee;
