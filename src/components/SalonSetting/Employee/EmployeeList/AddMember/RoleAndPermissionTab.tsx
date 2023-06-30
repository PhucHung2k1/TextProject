/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import {
  Grid,
  Box,
  Typography,
  Stack,
  Divider,
  ListItemIcon,
  styled,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { squareIconButtonStyles } from '@/helper/styleButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

interface IFormInput {
  portaltouchid: string;
}

interface RoleAndPermissionTabProps {}
const CustomListItemIcon = styled(ListItemIcon)({
  minWidth: 'auto',
  marginRight: '8px',
});
const RoleAndPermissionTab: React.FC<RoleAndPermissionTabProps> = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (values: any) => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: WorkingHoursTab.tsx:47 ~ onSubmit ~ values:',
      values
    );
  };
  const handleShowMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-w-[893px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-4 rounded-[8px] rounded-t-none border border-t-0 border-mango-gray-light-3 "
        noValidate
      >
        <Grid container spacing={2}>
          {/* Working hours  */}
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="space-between"
              className="px-5"
              alignItems="flex-start"
              spacing={2}
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                spacing={2}
                className="w-full "
              >
                <Typography
                  variant="caption"
                  className=" text-base text-text-secondary"
                >
                  Team members are allowed access with the following roles:
                </Typography>
                <Grid>
                  <Grid item xs={12} className="bg-bg-light rounded-[8px]">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      className="w-full  px-5 py-3"
                    >
                      <Typography
                        variant="caption"
                        className=" text-xl font-semibold text-text-title"
                      >
                        Technician
                      </Typography>
                      <IconButton className="bg-transparent hover:bg-[#FFEBEF]">
                        <DeleteOutlineOutlinedIcon
                          fontSize="small"
                          className="text-[#DA2036] "
                        />
                      </IconButton>
                    </Stack>
                    <Grid xs={12} item>
                      <Divider />
                    </Grid>
                    <Grid xs={12} className="flex flex-col-reverse" item>
                      <div className=" px-4 py-3">
                        {showMore ? (
                          <Button
                            variant="outlined"
                            onClick={handleShowMoreToggle}
                            className="border border-mango-text-gray-2 text-mango-text-gray-2 hover:border-mango-text-gray-2"
                          >
                            Show less
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={handleShowMoreToggle}
                            className="border border-mango-text-gray-2 text-mango-text-gray-2 hover:border-mango-text-gray-2 mt-[5px]"
                          >
                            Show more
                          </Button>
                        )}
                      </div>
                      {showMore ? (
                        <div>
                          {' '}
                          <Grid xs={12} item>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              className="w-full bg-bg-light px-5 py-3"
                            >
                              <AccountCircleIcon />
                              <Typography
                                variant="caption"
                                className=" text-base font-semibold text-text-title"
                              >
                                Technician
                              </Typography>
                            </Stack>
                            <List className="pb-3 pt-0">
                              <ListItem className="py-0">
                                <CustomListItemIcon>
                                  <FiberManualRecordIcon
                                    style={{ fontSize: 10 }}
                                  />
                                </CustomListItemIcon>
                                <ListItemText primary="Take Appointment" />
                              </ListItem>
                              <ListItem className="py-0">
                                <CustomListItemIcon>
                                  <FiberManualRecordIcon
                                    style={{ fontSize: 10 }}
                                  />
                                </CustomListItemIcon>
                                <ListItemText primary="Available for Booking Online" />
                              </ListItem>
                              <ListItem className="py-0">
                                <CustomListItemIcon>
                                  <FiberManualRecordIcon
                                    style={{ fontSize: 10 }}
                                  />
                                </CustomListItemIcon>
                                <Typography
                                  variant="caption"
                                  className=" text-base"
                                >
                                  Allowed to make quick payment
                                </Typography>
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid xs={12} item>
                            <Divider />
                          </Grid>
                          <Grid xs={12} item>
                            <Stack
                              direction="row"
                              className="w-full "
                              spacing={2}
                            >
                              <Grid xs={6} item>
                                <Stack direction="column" spacing={0}>
                                  <Grid xs={12} item>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                      className="w-full bg-bg-light px-5 py-3"
                                    >
                                      <Typography
                                        variant="caption"
                                        className=" text-base font-semibold text-text-title"
                                      >
                                        Appointment
                                      </Typography>
                                    </Stack>
                                    <List className="pb-3 pt-0">
                                      <ListItem className="py-0">
                                        <CustomListItemIcon>
                                          <LockOpenOutlinedIcon fontSize="small" />
                                        </CustomListItemIcon>
                                        <ListItemText primary="Access Appointment Book" />
                                      </ListItem>
                                      <ListItem className="py-0">
                                        <CustomListItemIcon>
                                          <FiberManualRecordIcon
                                            style={{ fontSize: 10 }}
                                          />
                                        </CustomListItemIcon>
                                        <ListItemText primary="Manage Appointment" />
                                      </ListItem>
                                      <ListItem className="py-0">
                                        <CustomListItemIcon>
                                          <FiberManualRecordIcon
                                            style={{ fontSize: 10 }}
                                          />
                                        </CustomListItemIcon>
                                        <Typography
                                          variant="caption"
                                          className=" text-base"
                                        >
                                          Manage Tech Request
                                        </Typography>
                                      </ListItem>
                                    </List>
                                  </Grid>
                                  <Grid xs={12} item>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                      className="w-full bg-bg-light px-5 py-3"
                                    >
                                      <Typography
                                        variant="caption"
                                        className=" text-base font-semibold text-text-title"
                                      >
                                        Create/ Charge
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                </Stack>
                                <List className="pb-3 pt-0">
                                  <ListItem className="py-0">
                                    <CustomListItemIcon>
                                      <LockOpenOutlinedIcon fontSize="small" />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Access Create/ Charge" />
                                  </ListItem>
                                  <ListItem className="py-0">
                                    <CustomListItemIcon>
                                      <FiberManualRecordIcon
                                        style={{ fontSize: 10 }}
                                      />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Access Manage Tips" />
                                  </ListItem>
                                  <ListItem className="py-0">
                                    <CustomListItemIcon>
                                      <FiberManualRecordIcon
                                        style={{ fontSize: 10 }}
                                      />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Allow Receive Cash Payment" />
                                  </ListItem>
                                  <ListItem className="py-0">
                                    <CustomListItemIcon>
                                      <FiberManualRecordIcon
                                        style={{ fontSize: 10 }}
                                      />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Add Discount" />
                                  </ListItem>
                                  <ListItem className="py-0">
                                    <CustomListItemIcon>
                                      <FiberManualRecordIcon
                                        style={{ fontSize: 10 }}
                                      />
                                    </CustomListItemIcon>
                                    <ListItemText primary="Manager Client" />
                                  </ListItem>
                                </List>
                              </Grid>

                              <Stack direction="column" spacing={0}>
                                <Grid xs={12} item>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    className="w-full bg-bg-light px-5 py-3"
                                  >
                                    <Typography
                                      variant="caption"
                                      className=" text-base font-semibold text-text-title"
                                    >
                                      Client Management
                                    </Typography>
                                  </Stack>
                                  <List className="pb-3 pt-0">
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <LockOpenOutlinedIcon fontSize="small" />
                                      </CustomListItemIcon>
                                      <ListItemText primary="Access Client Managemen" />
                                    </ListItem>
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <FiberManualRecordIcon
                                          style={{ fontSize: 10 }}
                                        />
                                      </CustomListItemIcon>
                                      <ListItemText primary="Adjust Loyalty Points" />
                                    </ListItem>
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <FiberManualRecordIcon
                                          style={{ fontSize: 10 }}
                                        />
                                      </CustomListItemIcon>
                                      <ListItemText primary="Delete Client" />
                                    </ListItem>
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <FiberManualRecordIcon
                                          style={{ fontSize: 10 }}
                                        />
                                      </CustomListItemIcon>
                                      <ListItemText primary="View Client Password" />
                                    </ListItem>
                                  </List>
                                </Grid>
                                <Grid xs={12} item>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    className="w-full bg-bg-light px-5 py-3"
                                  >
                                    <Typography
                                      variant="caption"
                                      className=" text-base font-semibold text-text-title"
                                    >
                                      Tech Portal
                                    </Typography>
                                  </Stack>
                                  <List className="pb-3 pt-0">
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <LockOpenOutlinedIcon />
                                      </CustomListItemIcon>
                                      <ListItemText primary="Access Tech Portal" />
                                    </ListItem>
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <FiberManualRecordIcon
                                          style={{ fontSize: 10 }}
                                        />
                                      </CustomListItemIcon>
                                      <ListItemText primary="View Appointment in Tech Portal" />
                                    </ListItem>
                                    <ListItem className="py-0">
                                      <CustomListItemIcon>
                                        <FiberManualRecordIcon
                                          style={{ fontSize: 10 }}
                                        />
                                      </CustomListItemIcon>
                                      <ListItemText primary="View Payroll in Tech Portal" />
                                    </ListItem>
                                  </List>
                                </Grid>
                              </Stack>
                            </Stack>
                          </Grid>
                        </div>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
              <IconButton
                className=" my-3 h-[40px] w-[120px] border-none bg-transparent text-base font-bold  normal-case  text-primary-main hover:bg-transparent"
                style={squareIconButtonStyles}
              >
                <AddOutlinedIcon className="" fontSize="small" /> Add Role
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RoleAndPermissionTab;
