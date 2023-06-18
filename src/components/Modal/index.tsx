import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import * as React from 'react';

interface ICustomModal {
  clickComponent: React.ReactNode;
  contentModal: React.ReactNode;
}

export default function CustomModal({
  clickComponent,
  contentModal,
}: ICustomModal) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {clickComponent ? (
        <Box onClick={handleOpen}>{clickComponent}</Box>
      ) : undefined}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>{contentModal || undefined}</>
      </Modal>
    </div>
  );
}
