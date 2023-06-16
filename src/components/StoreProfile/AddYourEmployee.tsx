import React, { useEffect } from 'react';
import LayoutAddMember from './LayoutAddEmployee/LayoutAddEmployee';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { AddYourEmployeeModal } from './LayoutAddEmployee/AddYourEmployeeModal';
import { setModalContentMUI, showModalMUI } from '@/store/modal/modalSlice';
import InvitationListComponent from './LayoutAddEmployee/InvitationListComponent';
import { invitationList } from '@/store/customer/customerAction';

const AddYourEmployee = () => {
  const dispatch = useAppDispatch();

  const invitationListData = useAppSelector(
    (state) => state.customerRoleSlice.invitationList
  );
  const isEmptyInvitationList = invitationListData.length === 0;
  const handleAddEmployee = async () => {
    dispatch(setModalContentMUI(<AddYourEmployeeModal />));
    dispatch(showModalMUI());
  };
  useEffect(() => {
    dispatch(invitationList({}));
  }, []);
  return (
    <>
      <LayoutAddMember
        icon="back"
        subTitle="Invite employees to join your salon"
        title="Add your employee"
        skip={isEmptyInvitationList}
        disableBtn={isEmptyInvitationList}
      >
        <div className=" my-5 flex min-h-[160px] w-full ">
          <Box
            className={`flex w-full items-center justify-center rounded-lg  !border-border-light  ${
              isEmptyInvitationList ? '!border !bg-blue-gray' : '!border-0 '
            }`}
          >
            {isEmptyInvitationList ? (
              <Button
                variant="text"
                onClick={handleAddEmployee}
                className="h-full w-full gap-2 text-base font-bold !text-blue-gray-900 "
                startIcon={
                  <PersonAddIcon sx={{ mb: 0.5, height: 28, width: 22 }} />
                }
              >
                Add employee
              </Button>
            ) : (
              <InvitationListComponent />
            )}
          </Box>
        </div>
      </LayoutAddMember>
    </>
  );
};
export default AddYourEmployee;
