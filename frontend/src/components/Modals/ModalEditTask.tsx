import { useState } from "react";
import { Checkbox, Modal } from "flowbite-react";
import TaskService from "../../services/Tasks"
import { Itask } from "../../models";

interface ItaskModal {
  task: Itask
}

const ModalEditTask = ( props: ItaskModal)=> {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(props.task.username);
  const [email, setEmail] = useState<string>(props.task.email);
  const [text, setText] = useState<string>(props.task.text);
  const [status, setStatus] = useState<boolean>(props.task.is_done);

  function onCloseModal() {
    setOpenModal(false);
  }

  const onUpdateClick = () => {
    const userData = {
      username: username,
      email: email,
      text: text,
      is_done: status
    };

    updateTask(userData, props.task.id)
    setOpenModal(false);
  };

  async function updateTask(data: any, task_id: number){
    return await TaskService.updateTask(data, task_id)
  }
 

  return (
    <div>
      <button onClick={() => setOpenModal(true)} className="">Edit</button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className="flex self-center bg-gray-3 my-5 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 window-size bg-opacity-50"
      >
        <Modal.Body>
          <div className="text-2xl text-black text-center"> Add Task </div>
          <div className=" ">
            <div>
              <input
                type="text"
                id="username"
                className="border-2 border-green-500 rounded px-2 mx-2 my-2 text-black"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username" className="text-black">
                username
              </label>
            </div>
            <div>
              <input
                type="email"
                id="email"
                className="border-2 border-green-500 rounded px-2 mx-2 my-2 text-black"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="text-black">
                email
              </label>
            </div>
            <div>
              <input
                type="text"
                id="text"
                className="border-2 border-green-500 rounded px-2 mx-2 my-2 text-black"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <label htmlFor="text" className="text-black">
                text
              </label>
            </div>
          </div>
          <div className="text-black text-center">status: <Checkbox checked={status} onChange={()=> setStatus(!status)}></Checkbox></div>
          <button
            type="submit"
            onClick={onUpdateClick}
            className="hover:bg-green-500 w-full my-2 text-green-500 hover:text-white rounded border-2 border-green-500"
          >
            Update
          </button>
          <button
            className="text-gray-500 bg-white border border-gray-500 hover:bg-gray-500 hover:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            onClick={() => onCloseModal()}
          >
            Close
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEditTask;

// fixed top-0 bg-gray-300 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 window-size bg-opacity-50