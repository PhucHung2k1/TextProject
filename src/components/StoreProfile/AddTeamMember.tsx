import { invitationList } from '@/store/customer/customerAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalCustomContainer from '../Modal/ModalCustom';
import { AddYourEmployeeModal } from './LayoutAddTeamMember/AddTeamMemberModal';
import InvitationListComponent from './LayoutAddTeamMember/InvitationListComponent';
import LayoutAddMember from './LayoutAddTeamMember/LayoutAddTeamMember';

const AddYourEmployee = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const invitationListData = useAppSelector(
    (state) => state.customerRoleSlice.invitationList
  );
  // .filter((item) => item.IsAccepted);
  const isEmptyInvitationList = invitationListData.length === 0;
  const handleAddEmployee = async () => {
    setOpenModal(true);
    // dispatch(setModalContentMUI(<AddYourEmployeeModal />));
    // dispatch(showModalMUI());
  };
  useEffect(() => {
    dispatch(invitationList({}));
  }, []);
  return (
    <>
      <ModalCustomContainer
        onClose={() => setOpenModal(false)}
        open={openModal}
        modalContent={<AddYourEmployeeModal />}
      />

      <LayoutAddMember
        icon="back"
        subTitle="Invite team member to join your salon"
        title="Add team member"
        skip={isEmptyInvitationList}
        disableBtn={isEmptyInvitationList}
      >
        <div className=" my-5 flex w-full ">
          <Box
            className={`flex  w-full items-center justify-center rounded-lg !border-dashed !border-border-light  ${
              isEmptyInvitationList ? '!border !bg-blue-gray' : '!border-0 '
            }`}
          >
            {isEmptyInvitationList ? (
              <Button
                variant="text"
                onClick={handleAddEmployee}
                className="justify-start font-semibold text-primary-main"
                startIcon={<AddIcon sx={{ color: '#00bdd6' }} />}
              >
                Add team member
              </Button>
            ) : (
              <InvitationListComponent
                invitationListData={invitationListData}
                handleAddEmployee={handleAddEmployee}
              />
            )}
          </Box>
        </div>
      </LayoutAddMember>
    </>
  );
};
export default AddYourEmployee;
