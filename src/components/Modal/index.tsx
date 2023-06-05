import '@reach/dialog/styles.css';

import { CloseOutlined } from '@mui/icons-material';
import { DialogContent, DialogOverlay } from '@reach/dialog';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { hideModal } from '@/store/modal/modalSlice';

const ModalContainer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modalSlice.isShowModal);
  const modalContent = useAppSelector((state) => state.modalSlice.modalContent);

  const close = () => {
    dispatch(hideModal());
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} className="z-[1002]">
      <DialogContent aria-label="modal-content" className="relative rounded">
        <button
          type="button"
          className="absolute right-0 top-0 p-4 hover:text-gray-500 focus:outline-none"
          onClick={close}
        >
          <span aria-hidden>
            <CloseOutlined />
          </span>
        </button>
        <div className="flex items-center justify-center">
          <hr className="mb-3 mt-2 w-1/12 border-green-500" />
        </div>
        <div className="my-4">{modalContent && modalContent}</div>
      </DialogContent>
    </DialogOverlay>
  );
};
export default ModalContainer;
