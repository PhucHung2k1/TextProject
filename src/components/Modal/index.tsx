import { DialogOverlay, DialogContent } from "@reach/dialog";
import { CloseOutlined } from "@ant-design/icons";
import { hideModal } from "@/store/modal/modalSlice";

import "@reach/dialog/styles.css";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const ModalContainer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modalSlice.isShowModal);
  const modalContent = useAppSelector((state) => state.modalSlice.modalContent);

  const close = () => {
    dispatch(hideModal());
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} className="z-1002">
      <DialogContent aria-label="modal-content" className="relative rounded">
        <button
          className="absolute top-0 right-0 p-4 focus:outline-none hover:text-gray-500"
          onClick={close}
        >
          <span aria-hidden>
            <CloseOutlined />
          </span>
        </button>
        <div className="flex justify-center items-center">
          <hr className="w-1/12 mt-2 mb-3 border-green-500" />
        </div>
        <div className="my-4">{modalContent && modalContent}</div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default ModalContainer;
