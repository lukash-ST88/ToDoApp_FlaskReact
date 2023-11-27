import { Itask } from "../../models"
import TaskService from "../../services/Tasks"
import { connect} from "react-redux";
import { IAuthProps } from "../Top/Top";
import { Dispatch, SetStateAction } from "react";
import ModalEdit from "../Modals/ModalEditTask";

export interface IIsAuhtenticated {
    isAuthenticated: boolean
}

interface ItaskIndex {
    task: Itask
    index: number
    setDeleteTask: Dispatch<SetStateAction<boolean>>
    auth: IIsAuhtenticated
}

const TaskCard = (props: ItaskIndex)=> {
    async function deleteTask(task_id: number) {
        console.log('onDelete')
        const response = await TaskService.deleteTask(task_id)
        props.setDeleteTask((prev)=> !prev)
        return response
    }

    return(
    <>
    <div className="grid grid-cols-1 gap-2 mx-20 my-5 border rounded-3xl divide-y-2 " key={props.index}>
        <div className="flex divide-x-2 justify-center ">
            <div className="px-20 my-3">{props.task.username}</div>
            <div className="px-20 my-3">{props.task.email}</div>
        </div>  
        <div className="text-start px-5">
            {props.task.text}
        </div>
        <div className="text-center">
            status: {props.task.is_done ? <>done </> : <> in process </>}
        </div>
        {props.auth.isAuthenticated && <div className="flex justify-around">
            <div className="bg-yellow-500 rounded-md my-3 p-3"><ModalEdit task={props.task}/></div>
            <div className="bg-red-500 rounded-md my-3 p-3" onClick={()=> deleteTask(props.task.id)}>Delete</div>
        </div> }
    </div>

    </>)
}


const mapStateToProps = (state:  ItaskIndex) => ({
    auth: state.auth,
  });


export default connect(mapStateToProps)(TaskCard);  