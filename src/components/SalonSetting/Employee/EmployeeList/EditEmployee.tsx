import {
  Grid,
  Box,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Divider,
  useScrollTrigger,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import Timeline from '@mui/lab/Timeline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import EmployeeProfileTab from './EditEmployeeTab/EmployeeProfileTab';

interface EditEmployeeProps {
  handleCloseDrawer: any;
}
const listTabs = [
  'Team member profile',
  'App & Portal Management',
  'Working hours',
  'Role & Permission',
  'Pay Structure',
  'Service & Product',
];
const EditEmployee: React.FC<EditEmployeeProps> = ({ handleCloseDrawer }) => {
  const [openCollapses, setOpenCollapses] = useState<string[]>([
    'Team member profile',
  ]);
  const trigger = useScrollTrigger();
  const handleCollapseToggle = (id: any) => {
    if (openCollapses.includes(id)) {
      setOpenCollapses(openCollapses.filter((collapseId) => collapseId !== id));
    } else {
      setOpenCollapses([...openCollapses, id]);
    }
  };
  const renderCollapse = (id: any, label: any, content: any) => {
    const isOpen = openCollapses.includes(id);

    return (
      <React.Fragment key={id}>
        <ListItem
          disablePadding
          className={` my-5 mb-0 flex items-center justify-between border ${
            isOpen
              ? 'mb-0 rounded-[8px] rounded-b-none'
              : 'my-5 rounded-[8px] rounded-b-none'
          } mb-0 w-full justify-between !border-border-light bg-white font-bold capitalize text-50 `}
        >
          <ListItemButton onClick={() => handleCollapseToggle(id)}>
            <ListItemText
              className="my-3 w-[90%]"
              primaryTypographyProps={{
                sx: {
                  fontSize: '16px',
                  fontWeight: '600',
                },
              }}
              primary={label}
            />
            {isOpen ? (
              <RemoveIcon className="h-8 w-8 cursor-pointer rounded border border-cyan-50 bg-background-paper-elevation-1 text-icon-color" />
            ) : (
              <AddIcon className="h-8 w-8 cursor-pointer rounded border border-cyan-50 bg-cyan-50 text-text-primary-dark" />
            )}
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {content}
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <div className="w-screen">
      <div
        className={`sticky top-0 z-10 bg-white pb-[20px] pt-[32px] ${
          trigger ? 'mb-4' : ''
        }`}
      >
        <div className="text-center text-3xl font-semibold text-text-title">
          <p>Add new member</p>
        </div>
        <Box
          onClick={handleCloseDrawer}
          className="absolute left-5 top-8 cursor-pointer text-icon-color"
        >
          <CloseIcon fontSize="large" />
        </Box>
        {trigger && <Divider />}
      </div>
      <div className="fixed top-40 mt-[36px] flex w-[474px] justify-end ">
        <Timeline
          position="left"
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {listTabs.map((item) => {
            return (
              <TimelineItem key={`${Math.random()}`}>
                <TimelineSeparator>
                  <TimelineDot sx={{ background: '#C5C4C9' }} />
                  <TimelineConnector sx={{ background: '#C5C4C9' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ color: '#404044' }}>
                  {item}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
      <Grid container spacing={2} className=" mx-auto w-[972px] bg-white">
        <Grid xs={12} item>
          <List className="">
            {renderCollapse(
              'Team member profile',
              'Team member profile',
              <EmployeeProfileTab />
            )}
            {renderCollapse(
              'App & Portal Management',
              'App & Portal Management',
              <div>Content for Collapse 2</div>
            )}
            {renderCollapse(
              'Working hours',
              'Working hours',
              <div>Content for Collapse 3</div>
            )}
            {renderCollapse(
              'Role & Permission',
              'Role & Permission',
              <div>Content for Collapse 3</div>
            )}
            {renderCollapse(
              'Pay Structure',
              'Pay Structure',
              <div>Content for Collapse 3</div>
            )}
            {renderCollapse(
              'Service & Product',
              'Service & Product',
              <div>Content for Collapse 3</div>
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default EditEmployee;
