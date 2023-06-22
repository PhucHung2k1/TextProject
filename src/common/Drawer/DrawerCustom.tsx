// @flow
import { Drawer } from '@mui/material';
import * as React from 'react';

interface Props {
  openDrawer: boolean;
  setOpenDrawer: Function;
  content?: React.ReactNode;
}
export const DrawerCustom = ({ openDrawer, setOpenDrawer, content }: Props) => {
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <Drawer
      anchor="right"
      className="z-[9999]"
      open={openDrawer}
      onClose={handleCloseDrawer}
    >
      {content && content}
    </Drawer>
  );
};
