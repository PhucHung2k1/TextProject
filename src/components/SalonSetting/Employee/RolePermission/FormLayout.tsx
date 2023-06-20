import { Button, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddRoleAndPermission from './AddRoleAndPermission';
import SetAccessibility from './SetAccessibility';

function AddForm() {
  return (
    <div className="p-4 bg-white h-screen" style={{ width: 'calc(100vw / 3)' }}>
      <div className=" sticky top-4 flex flex-row items-center justify-between  z-[999] bg-white">
        <IconButton>
          <CloseIcon fontSize="large" />
        </IconButton>
        <p className="text-3xl font-semibold text-text-title">
          Add Role & Permission
        </p>
        <div></div>
      </div>
      {/* <AddRoleAndPermission /> */}
      <div className=" overflow-y-auto">
        <SetAccessibility />
      </div>

      <div className="sticky bottom-0 right-0 w-full h-20 flex flex-row justify-around items-center bg-white border-t border-gray-200 z-[999]">
        <Button className=" px-20 py-2" variant="outlined">
          Cancel
        </Button>
        <Button className=" px-20 py-2" variant="outlined">
          CONTINUE
        </Button>
      </div>
    </div>
  );
}

export default AddForm;
