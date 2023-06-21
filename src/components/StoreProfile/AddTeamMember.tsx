import React, { useEffect, useState } from 'react';
import LayoutAddMember from './LayoutAddTeamMember/LayoutAddTeamMember';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { AddYourEmployeeModal } from './LayoutAddTeamMember/AddTeamMemberModal';
import InvitationListComponent from './LayoutAddTeamMember/InvitationListComponent';
import { invitationList } from '@/store/customer/customerAction';
import ModalCustomContainer from '../Modal/ModalCustom';

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
                className="h-40 w-full  gap-2 text-base font-bold !text-blue-gray-900 "
                startIcon={
                  <PersonAddIcon sx={{ mb: 0.5, height: 28, width: 22 }} />
                }
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
