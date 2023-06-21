import { useAppDispatch, useAppSelector } from '@/store/hook';
import { resetStatusModalCustom } from '@/store/modal/modalSlice';
import { Box, Modal } from '@mui/material';
import { useEffect, type ReactNode } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
interface Props {
  open: boolean;
  modalContent: ReactNode;
  onClose: Function;
}
const ModalCustomContainer = ({ open, modalContent, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const isOpenModalCustom = useAppSelector(
    (state) => state.modalSlice.hideModalCustom
  );
  useEffect(() => {
    if (isOpenModalCustom) {
      onClose();
      dispatch(resetStatusModalCustom());
    }
  }, [isOpenModalCustom]);
  return (
    <Modal open={open} onClose={() => onClose()} closeAfterTransition>
      <Box sx={style}>{modalContent && modalContent}</Box>
    </Modal>
  );
};
export default ModalCustomContainer;
