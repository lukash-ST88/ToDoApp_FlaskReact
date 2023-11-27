import axios from "axios";
import { Itask, ItasksRetrieve } from "../models";

interface IdataAdd {
  username: string
  email: string
  text: string
}
interface IupadteData extends IdataAdd {
  id_done: boolean
}


export const API_URL = "http://localhost:5000";

class TaskService {
  getAllTasks(page: number) {
    const url = `${API_URL}/api/`;
    const response = axios.get<ItasksRetrieve>(url, {
      params: {
        page: page
      },
    });
    return response;
  }
  getTaskById(task_id: string) {
    const url = `${API_URL}/api/${task_id}`;
    const response = axios.get<Itask>(url);
    return response;
  }
  addTask(dataAdd: IdataAdd){
    const url = `${API_URL}/api/add`;
    const response = axios.post(url, dataAdd)
    return response
  }
  getSortedTasks(page: number, sort: string, order: string ){
    const url = `${API_URL}/api/sort/`;
    const response = axios.get(url, {
      params: {
        page: page,
        sort: sort,
        order: order
      }
    })
    return response
  }
  deleteTask(task_id: number) {
    const url = `${API_URL}/api/${task_id}`;
    const response = axios.delete(url)
    return response
  }
  updateTask(dataUpdate: IupadteData, task_id: number){
    const url = `${API_URL}/api/${task_id}`;
    const response = axios.put(url, dataUpdate)
    return response
  }
}

export default new TaskService();