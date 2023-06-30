import {
  Grid,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
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
import MemberProfileTab from './MemberProfileTab';
import AddAppPortalManagementTab from './AddAppPortalManagementTab';
import type { IEmployee } from '@/services/employee.service/employee.interface';
import StickyListWithDivider from '@/common/StickyHeader';
import WorkingHours from './WorkingHours';
import RoleAndPermissionTab from './RoleAndPermissionTab';

interface AddMemberProps {
  handleCloseDrawer: any;
  selectedEmployee: IEmployee | undefined;
}
const listTabs = [
  'Team member profile',
  'App & Portal Management',
  'Working hours',
  'Role & Permission',
  'Pay Structure',
  'Service & Product',
];
const AddMember: React.FC<AddMemberProps> = ({
  handleCloseDrawer,
  selectedEmployee,
}) => {
  const [openCollapses, setOpenCollapses] = useState<string[]>([
    'Team member profile',
  ]);
  const [showDivider, setShowDivider] = useState(false);
  const handleScroll = () => {
    const scrollThreshold = 200;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > scrollThreshold) {
      setShowDivider(true);
      console.log('Scroll event occurred.');
    } else {
      setShowDivider(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleCollapseToggle = (id: any) => {
    if (openCollapses.includes(id)) {
      setOpenCollapses(openCollapses.filter((collapseId) => collapseId !== id));
    } else {
      setOpenCollapses([...openCollapses, id]);
    }
  };
  const renderCollapse = (id: any, label: any, content: any) => {
    const isOpen = openCollapses.includes(id);
    window.addEventListener('scroll', handleScroll);
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
              <RemoveIcon className="h-8 w-8 cursor-pointer rounded  bg-background-paper-elevation-1 text-icon-color" />
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
    <div>
      <StickyListWithDivider
        isShowDivider={showDivider}
        handleCloseDrawer={handleCloseDrawer}
        title="Add new member"
      />
      <div className="top-25 fixed mt-[36px] flex w-[474px] justify-end ">
        <Timeline
          position="left"
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {listTabs.map((item, index) => {
            return (
              <TimelineItem key={`${Math.random()}`}>
                <TimelineSeparator>
                  <TimelineDot sx={{ background: '#C5C4C9' }} />
                  <TimelineConnector
                    sx={{
                      background:
                        index === listTabs.length - 1
                          ? 'transparent'
                          : '#C5C4C9',
                    }}
                  />
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
              <MemberProfileTab selectedEmployee={selectedEmployee} />
            )}
            {renderCollapse(
              'App & Portal Management',
              'App & Portal Management',
              <AddAppPortalManagementTab selectedEmployee={selectedEmployee} />
            )}
            {renderCollapse('Working hours', 'Working hours', <WorkingHours />)}
            {renderCollapse(
              'Role & Permission',
              'Role & Permission',
              <RoleAndPermissionTab />
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
export default AddMember;
