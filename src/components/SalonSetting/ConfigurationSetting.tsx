import { Box, Tab, styled } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useState } from 'react';
import General from './General/General';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    // eslint-disable-next-line tailwindcss/no-custom-classname
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    color: '#00BED6',
    backgroundColor: '#00BED6',
  },
});
export const ConfigurationSetting = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const items = [
    {
      id: 0,
      label: (
        <span style={{ font: 'normal normal 600 var(--s-18)' }}>GENERAL</span>
      ),
      key: 'general',

      children: <General />,
    },
    {
      id: 1,
      label: (
        <span style={{ font: 'normal normal 600 var(--s-18)' }}>
          NOTIFICATIONS
        </span>
      ),
      key: 'notifications',
      children: <></>,
    },

    {
      id: 2,
      label: (
        <span style={{ font: 'normal normal 600 var(--s-18)' }}>
          DEVICE MANAGER
        </span>
      ),
      key: 'deviceManager',
      children: <></>,
    },
  ];

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={activeKey} onChange={handleChange}>
            {items.map((item) => (
              <Tab
                key={item.key}
                label={item.label}
                className="text-xl font-bold"
              />
            ))}
          </StyledTabs>
        </Box>
        {items.map((item) => {
          return item.id === activeKey ? (
            <div key={item.key}>{item.children}</div>
          ) : (
            <></>
          );
        })}
      </Box>
    </>
  );
};
