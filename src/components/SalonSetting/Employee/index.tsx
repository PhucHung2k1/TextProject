import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import PayStructure from './PayStructure/PayStructure';
import { StyledTabs, AntTab } from '../ConfigurationSetting';
import EmployeeList from './EmployeeList/EmployeeList';
import RolePermissionList from './RolePermission/ListRolePermission';
import { sxTextField } from '@/utils/helper/styles';
import { Search, MoreHoriz } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ServiceAndProduct from './ServiceAndProduct/ServiceAndProduct';

export const EmployeeSetting = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const items = [
    {
      id: 0,
      label: 'TEAM MEMBERS',
      key: 'team',
      children: <EmployeeList />,
      icon: <HomeOutlinedIcon />,
    },
    {
      id: 1,
      label: 'ROLE & PERMISSION',
      key: 'rolePermissions',
      children: <RolePermissionList />,
    },

    {
      id: 2,
      label: 'PAY STRUCTURE',
      key: 'payStructure',
      children: <PayStructure />,
    },
    {
      id: 3,
      label: 'SERVICE & PRODUCT',
      key: 'serviceProduct',
      children: <ServiceAndProduct />,
    },
  ];

  return (
    <Grid container spacing={2} className="mt-0">
      <Grid xs={6} item>
        <Stack direction="column" spacing={0}>
          <p className="text-[48px] font-semibold text-text-title">Team</p>
          <p className="text-sm  text-text-secondary">
            Manage your team easily with groups
          </p>
        </Stack>
      </Grid>
      <Grid xs={6} item>
        <div className="flex w-full items-center justify-end gap-6">
          <TextField
            sx={sxTextField}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              style: { height: '48px' },
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            className="min-w-[188px]"
          />
          <Button
            className="h-[48px] min-w-[188px] border-none bg-primary-main text-[16px] font-bold text-white hover:bg-primary-main"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            New Member
          </Button>
          <Button
            className="h-12 border-mango-gray-light-3 px-0 text-icon-color"
            variant="outlined"
          >
            <MoreHoriz fontSize="large" />
          </Button>
        </div>
      </Grid>

      <Grid xs={12} item>
        <Box className="h-full w-full">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs value={activeKey} onChange={handleChange}>
              {items.map((item) => (
                <AntTab
                  key={item.key}
                  label={item.label}
                  icon={item.icon}
                  iconPosition="start"
                />
              ))}
            </StyledTabs>
          </Box>
          <Box className="overflow-auto">
            {items.find((item) => item.id === activeKey)?.children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
