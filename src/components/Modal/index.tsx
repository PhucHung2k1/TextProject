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
        <div onClick={handleOpen}>{clickComponent}</div>
      ) : undefined}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>{contentModal ? contentModal : undefined}</>
      </Modal>
    </div>
  );
}
