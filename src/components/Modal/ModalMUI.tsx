import { useAppDispatch, useAppSelector } from '@/store/hook';
import { hideModalMUI } from '@/store/modal/modalSlice';
import { Box, Modal } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
const ModalMUIContainer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modalSlice.isShowModalMUI);
  const modalContent = useAppSelector(
    (state) => state.modalSlice.modalContentMUI
  );

  const close = () => {
    dispatch(hideModalMUI());
  };

  return (
    <Modal open={isOpen} onClose={close} closeAfterTransition>
      <Box sx={style}>{modalContent && modalContent}</Box>
    </Modal>
  );
};
export default ModalMUIContainer;
