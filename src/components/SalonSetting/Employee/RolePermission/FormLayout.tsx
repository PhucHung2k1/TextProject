import { Button, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function AddForm() {
  return (
    <div className="h-screen bg-white p-4" style={{ width: 'calc(100vw / 3)' }}>
      <div className=" sticky top-4 z-[999] flex flex-row items-center  justify-between bg-white">
        <IconButton>
          <CloseIcon fontSize="large" />
        </IconButton>
        <p className="text-3xl font-semibold text-text-title">
          Add Role & Permission
        </p>
        <div />
      </div>
      {/* <AddRoleAndPermission /> */}
      <div className=" overflow-y-auto">{/* <SetAccessibility /> */}</div>

      <div className="sticky bottom-0 right-0 z-[999] flex h-20 w-full flex-row items-center justify-around border-t border-gray-200 bg-white">
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
