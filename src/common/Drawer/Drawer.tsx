import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface ICustomDrawer {
  anchor: Anchor;
  clickNode: React.ReactNode;
  content: React.ReactNode;
}

export default function CustomDrawer({
  anchor,
  clickNode,
  content,
}: ICustomDrawer) {
  const [drawerStatus, setDrawerStatus] = React.useState<boolean>(false);

  const toggleDrawer =
    (status: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerStatus(status);
    };

  return (
    <div>
      <React.Fragment key={anchor}>
        <div className=" cursor-pointer" onClick={toggleDrawer(true)}>
          {clickNode}
        </div>
        <SwipeableDrawer
          anchor={anchor}
          open={drawerStatus}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {content}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
