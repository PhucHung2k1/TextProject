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
    // <Stack
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   className="relative w-[100%]"
    // >
    //   <div>
    //     <div className=" flex items-center justify-center text-3xl font-semibold text-text-title">
    //       <p>Add Member</p>
    //     </div>
    //     <Box
    //       onClick={handleCloseDrawer}
    //       className="absolute inset-6 h-5 w-5 cursor-pointer  text-icon-color"
    //     >
    //       <CloseIcon fontSize="large" />
    //     </Box>
    //   </div>

    //   <Grid container spacing={2} className=" bg-white p-8">
    //     <Stack
    //       direction="column"
    //       alignItems="center"
    //       justifyContent="center"
    //       spacing={2}
    //     >
    //       {/* Team member profile */}
    //       <Grid
    //         xs={12}
    //         item
    //         className="relative mt-8 rounded-lg border  border-mango-gray-light-3 "
    //       >
    //         <Stepper
    //           activeStep={0}
    //           orientation="vertical"
    //           className="absolute left-[-220px] "
    //         >
    //           {steps.map((step, index) => (
    //             <Step key={step.label}>
    //               <StepLabel
    //                 optional={
    //                   index === 2 ? (
    //                     <Typography variant="caption">Last step</Typography>
    //                   ) : null
    //                 }
    //               >
    //                 {step.label}
    //               </StepLabel>
    //             </Step>
    //           ))}
    //         </Stepper>

    //         <Grid xs={12} item>
    //           {/* <EmployeeProfileTab selectedEmployee={selectedEmployee} /> */}
    //         </Grid>
    //       </Grid>
    //       {/* App & Potal Management */}
    //       <Grid
    //         xs={12}
    //         item
    //         className=" mt-8 rounded-lg border  border-mango-gray-light-3 "
    //       >
    //         <Grid xs={12} item>
    //           {/* <AppPortalManagementTab selectedEmployee={selectedEmployee} /> */}
    //         </Grid>
    //       </Grid>
    //       {/* Working Hours Tab */}
    //       <Grid
    //         xs={12}
    //         item
    //         className=" mt-8 rounded-lg border  border-mango-gray-light-3 "
    //       >
    //         <Grid xs={12} item>
    //           <WorkingHoursTab />
    //         </Grid>
    //       </Grid>
    //       {/* Role and permission */}
    //       <Grid
    //         xs={12}
    //         item
    //         className=" mt-8 rounded-lg border  border-mango-gray-light-3 "
    //       >
    //         <Grid xs={12} item>
    //           <RoleAndPermissionTab />
    //         </Grid>
    //       </Grid>
    //     </Stack>
    //   </Grid>

    //   <div className="w-full border-t border-mango-gray-light-3 py-6">
    //     <Stack
    //       direction="row"
    //       alignItems="center"
    //       justifyContent="center"
    //       spacing={2}
    //     >
    //       <Grid xs={3} item>
    //         <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary">
    //           Cancel
    //         </div>
    //       </Grid>
    //       <Grid xs={3} item>
    //         <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold uppercase text-white">
    //           Save
    //         </div>
    //       </Grid>
    //     </Stack>
    //   </div>
    // </Stack>
  );
};
export default AddMember;
