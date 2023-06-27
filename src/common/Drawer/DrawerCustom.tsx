// @flow
import { Drawer } from '@mui/material';
import * as React from 'react';

interface Props {
  openDrawer: boolean;
  onClose: Function;
  content?: React.ReactNode;
}
export const DrawerCustom = ({ openDrawer, onClose, content }: Props) => {
  return (
    <Drawer
      anchor="right"
      className="z-[1400]"
      open={openDrawer}
      onClose={() => onClose()}
    >
      {content && content}
    </Drawer>
  );
};
