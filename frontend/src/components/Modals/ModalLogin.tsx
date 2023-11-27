import { Modal } from "flowbite-react";
import { useState } from "react";
import LoginTag from "../Auth/Login/LoginTag";

export const ModalLogin = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLogedIn, setIsLogedIn] = useState<boolean>(true);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>Login</button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className="flex self-center bg-gray-3 my-5 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 window-size bg-opacity-50"
      >
        <Modal.Body>
          <div className="text-2xl text-black text-center mt-3"> Login </div>
          <div className="">
            <LoginTag />
            <button
              className="text-gray-500 bg-white border border-gray-500 hover:bg-gray-500 hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              onClick={() => onCloseModal()}
            >
              Закрыть
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
