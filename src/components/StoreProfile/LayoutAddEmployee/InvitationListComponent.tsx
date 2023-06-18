import { Avatar, Box, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '@/store/hook';

const InvitationListComponent = ({ handleAddEmployee }: any) => {
  // const dispatch = useAppDispatch();
  const invitationListData = useAppSelector(
    (state) => state.customerRoleSlice.invitationList
  ).filter((item) => item.IsAccepted);

  // const handleAddEmployee = () => {
  //   dispatch(getAllRole({}));
  //   dispatch(lookupData({}));
  //   dispatch(setModalContentMUI(<AddYourEmployeeModal />));
  //   dispatch(showModalMUI());
  // };
  return (
    <Box className="w-full overflow-y-auto overflow-x-hidden ">
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
                  {item.CustomerRoleId}
                </Typography>
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                className={`cursor-pointer gap-1 rounded px-3 py-1 text-sm !shadow-none ${
                  item.IsSentMail
                    ? '!bg-bg-disable !text-text-disable'
                    : '!bg-mango-primary-blue !text-white '
                }`}
                disabled={item.IsSentMail}
                startIcon={item.IsSentMail && <CheckIcon fontSize="small" />}
              >
                Sent
              </Button>
            </div>
          </Box>
        );
      })}

      <Button
        onClick={handleAddEmployee}
        startIcon={<AddIcon fontSize="medium" />}
        variant="text"
        className="text-base font-semibold text-primary-main "
      >
        Add your employee
      </Button>
    </Box>
  );
};
export default InvitationListComponent;
