import React, { useEffect } from 'react';
import LayoutAddMember from './LayoutAddEmployee/LayoutAddEmployee';
import AddIcon from '@mui/icons-material/Add';
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
  // .filter((item) => item.IsAccepted);
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
                Add employee
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
