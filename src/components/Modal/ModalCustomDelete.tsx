import { useAppDispatch, useAppSelector } from '@/store/hook';
import { resetStatusModalCustom } from '@/store/modal/modalSlice';
import { Box, Button, Modal } from '@mui/material';
import { useEffect } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
interface Props {
  open: boolean;
  onClose: Function;
  onCancel: any;
  onSubmit: any;
  titleModal: string;
  subTitle: string;
  textButtonCancel?: string;
  textButtonSubmit?: string;
}
const ModalCustomDelete = ({
  open,
  onClose,
  onCancel,
  onSubmit,
  titleModal,
  subTitle,
  textButtonCancel = 'No, Cancel',
  textButtonSubmit = 'Yes',
}: Props) => {
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
      <Box sx={style}>
        <div className="flex h-auto w-[568px] flex-col items-center justify-center gap-5 rounded bg-white p-5 shadow-md ">
          <div className="text-xl font-bold text-text-title">{titleModal}</div>
          <div className="text-base text-primary-dark">{subTitle}</div>
          <div className="flex w-full items-center justify-center gap-5">
            <Button
              type="button"
              className="h-10 w-[140px] border-mango-gray-light-3  px-4 text-base font-bold capitalize text-mango-text-gray-2 hover:border-mango-gray-light-3 "
              variant="outlined"
              onClick={onCancel}
            >
              {textButtonCancel}
            </Button>
            <Button
              className="h-10 w-[140px] border-none bg-icon-delete px-4 text-base font-bold capitalize text-white hover:bg-icon-delete"
              variant="outlined"
              type="button"
              onClick={onSubmit}
            >
              {textButtonSubmit}
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default ModalCustomDelete;
