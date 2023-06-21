import { Avatar, Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { IInvitationListData } from '@/services/customer.service/customer.interface';

interface Props {
  handleAddEmployee: Function;
  invitationListData: IInvitationListData[];
}
const InvitationListComponent = ({
  handleAddEmployee,
  invitationListData,
}: Props) => {
  return (
    <Box className="w-full">
      <Box className="max-h-[50vh] overflow-y-auto overflow-x-hidden">
        {invitationListData.map((item, index) => {
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="flex h-20 w-full flex-row items-center justify-between border-b border-line-main p-5"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  sx={{ bgcolor: '##DEDEE3', height: 48, width: 48 }}
                  className="capitalize"
                >
                  {item.LastName.charAt(0)}
                </Avatar>

                <div className="flex h-full flex-col justify-between">
                  <Typography
                    variant="h6"
                    className="text-base font-semibold capitalize text-primary-dark"
                  >
                    {`${item.FirstName} ${item.LastName}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.CustomerRoleName || 'No Role'}
                  </Typography>
                </div>
              </div>
            </Box>
          );
        })}
      </Box>

      <Button
        onClick={() => handleAddEmployee()}
        startIcon={<AddIcon fontSize="medium" />}
        variant="text"
        className="text-base font-semibold text-primary-main "
      >
        Add team member
      </Button>
    </Box>
  );
};
export default InvitationListComponent;
