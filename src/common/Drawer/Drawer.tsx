/* eslint-disable jsx-a11y/click-events-have-key-events */
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface ICustomDrawer {
  anchor: Anchor;
  clickNode: React.ReactNode;
  content: React.ReactNode | (() => React.ReactElement);
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
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className=" cursor-pointer" onClick={toggleDrawer(true)}>
          {clickNode}
        </div>
        <SwipeableDrawer
          anchor={anchor}
          open={drawerStatus}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className="mt-10"
        >
          {typeof content === 'function' ? content() : content}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
