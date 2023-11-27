import LoginTag from "../Auth/Login/LoginTag";
import ModalAddTask from "../Modals/ModalAddTask";
import { connect} from "react-redux";
import { ModalLogin } from "../Modals/ModalLogin";
import { logout } from "../Auth/Login/LoginAction";


export interface IIsAuhtenticated {
    isAuthenticated: boolean
}

export interface IAuthProps {
    auth: IIsAuhtenticated
    logout: () => void;
}

const Top = (props: IAuthProps) => {
    return (
    <>
    <div className="flex justify-around">
        <div className="rounded rounded-4xl bg-green-500 text-center text-2xl p-3"> <ModalAddTask/> </div>
            <div className="text-2xl">ToDoApp Flask React</div>
        {props.auth.isAuthenticated ? 
        <div className="rounded rounded-4xl text-center text-2xl p-3 bg-red-500 hover:text-red-500 hover:bg-white" onClick={() => props.logout()}>logout</div>
        :<div className="rounded rounded-4xl text-center text-2xl p-3 bg-green-500 hover:text-green-500 hover:bg-white"><ModalLogin/></div>}</div>
    </>
    )
}

const mapStateToProps = (state: IAuthProps) => ({
    auth: state.auth,
  });


export default connect(mapStateToProps, {logout})(Top);  