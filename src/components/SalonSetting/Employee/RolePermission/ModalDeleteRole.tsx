/* eslint-disable jsx-a11y/anchor-is-valid */

import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import { deleteRole } from '@/store/customerRole/customerRoleAction';
import { useAppDispatch } from '@/store/hook';
import { Button } from '@mui/material';
import React from 'react';

interface ModalDeleteRoleProps {
  item: IAllCustomerRole | any;
  handleCloseModal: any;
}

export const ModalDeleteRole: React.FC<ModalDeleteRoleProps> = ({
  item,
  handleCloseModal,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex h-auto w-[568px] flex-col items-center justify-center gap-5 rounded-2xl bg-white p-5 shadow-md ">
      <div className="text-xl font-bold text-text-title">Remove role?</div>
      <div className="text-base text-primary-dark">
        Would you like to remove "{item.Name}" role and permission?
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <Button
          type="button"
          className="h-10 w-[140px] border-mango-gray-light-3  px-4 text-base font-bold capitalize text-mango-text-gray-2 hover:border-mango-gray-light-3 "
          variant="outlined"
          onClick={handleCloseModal}
        >
          No, Cancel
        </Button>
        <Button
          className="h-10 w-[140px] bg-icon-delete px-4 text-base font-bold capitalize hover:bg-icon-delete"
          variant="contained"
          type="button"
          onClick={() => {
            dispatch(deleteRole(item.Id)).then((res) => {
              if (res) {
                handleCloseModal();
              }
            });
          }}
        >
          Yes, Delete it
        </Button>
      </div>
    </div>
  );
};
