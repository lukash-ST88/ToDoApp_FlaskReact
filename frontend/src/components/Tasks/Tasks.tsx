import { useEffect, useState } from "react";
import { Itask } from "../../models";
import { useFetching } from "../../hooks/useFatching";
import TaskService from "../../services/Tasks";
import Loader from "../Loader/Loader";
import TaskCard from "./TaskCard";
import Pagination from "../Pagination/Pagination";
import { getPageCount } from "../../utils/pages";
import Sorter from "../Sorter/Sorter";

export interface Isorter {
  sort: string;
  order: string;
}


const Tasks = () => {
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [sorter, setSorter] = useState<Isorter>({ sort: "", order: "" });
  const [deleteTask, setDeleteTask] = useState(false)

  useEffect(() => {
    fetchTasks(page, sorter.sort, sorter.order);
    // console.log(axios.defaults.headers.common['Authorization'])

  }, [page, sorter, deleteTask]);

  const [fetchTasks, isTaskLoading, taskError]: any = useFetching(
    async (page: number, sort: string, order: string) => {
      const response = sort.length ? await TaskService.getSortedTasks(page, sort, order) : await TaskService.getAllTasks(page)
      setTasks([...response.data.results]);
      const totalCount = response.data.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  function changePage(page: number) {
    setPage(page);
  }

  return (
    <>
      <div className="flex">
        <div className="w-5/6">
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task: Itask, index: number) => {
              return (
                <>
                    <TaskCard task={task} index={index} setDeleteTask={setDeleteTask}/>
                </>
              );
            })}
          </div>
          {isTaskLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
            {taskError && (
            <div className="bg-red-500 text-white">
                {taskError}
            </div>
          )}
        <div className="flex justify-center">
          <Pagination page={page} totalPages={totalPages} changePage={changePage} />
        </div>
        </div>
        <div className="w-1/6 color-test ">
              <Sorter sorter={sorter} setSorter={setSorter} />
        </div>
      </div>
    </>
  );
};

export default Tasks;
