import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar2 } from '../../components';
import Card from '../../components/card/card';
import ModalForm from '../../components/modal/modal2';
import { AccessService } from '../../services';

export default function Todo(): React.ReactElement {
  const navigation = useNavigate();
  const accessService = new AccessService();
  const accountId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');

  const [taskList, setTaskList] = useState([]);
  const [checkReload, setcheckReload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigation('/login');
    }
    getAllTaskList();
  }, [checkReload]);
  useEffect(() => {}, [taskList]);

  ////////
  const getAllTaskList = async () => {
    try {
      const tasks: any = await accessService.getAllTask(accountId, token);
      setTaskList(tasks.data);
      // console.log(tasks);
    } catch (err) {
      console.log(err.message);
    }
  };
  ////////
  const deleteTaskItem = async (taskId: string) => {
    try {
      await accessService.deleteTask(accountId, taskId, token);
      setcheckReload((prevValue) => !prevValue);
    } catch (err) {
      console.log(err.message);
    }
  };

  const [modalstate, setModalstate] = useState(false);
  const toggle = () => {
    setModalstate(!modalstate);
  };

  ///// filterr task
  const filterProperty_Reset = () => {
    setcheckReload(!checkReload);
  };
  const filterProperty_Priority = async () => {
    const priority: boolean = true;
    try {
      const tasks: any = await accessService.getTaskFiltered(
        accountId,
        token,
        priority,
      );
      setTaskList(tasks.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  //
  const filterProperty_Done = async () => {
    const isCompleted: boolean = true;
    try {
      const tasks: any = await accessService.getTaskFiltered(
        accountId,
        token,
        isCompleted,
      );
      setTaskList(tasks.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  //
  const filterProperty_Pending = async () => {
    const isCompleted: boolean = false;
    try {
      const tasks: any = await accessService.getTaskFiltered(
        accountId,
        token,
        isCompleted,
      );
      setTaskList(tasks.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar2 />
      <br></br>
      <div>
        <div className="header text-center">
          <h3>Todo List</h3>
          <button className="btn btn-primary mt-2" onClick={toggle}>
            Create Task
          </button>

          <div>
            {modalstate && (
              <ModalForm
                setmodalState={setModalstate}
                isActive={modalstate}
                setcheckReload={setcheckReload}
                taskObj={null}
              />
            )}
          </div>
        </div>
        <br />
        <div className="text-center">
          <small>Filter: </small>

          <button onClick={filterProperty_Reset} style={{ borderRadius: 15 }}>
            Reset
          </button>
          <button
            onClick={filterProperty_Priority}
            style={{ borderRadius: 15 }}
          >
            Priority
          </button>
          <button onClick={filterProperty_Done} style={{ borderRadius: 15 }}>
            Done
          </button>
          <button onClick={filterProperty_Pending} style={{ borderRadius: 15 }}>
            Pending
          </button>
        </div>
        <br></br>
        <div className="card-deck">
          {taskList &&
            taskList.map((item) => {
              return (
                <div key={item.id}>
                  <Card
                    taskObj={item}
                    deleteTask={deleteTaskItem}
                    setcheckReload={setcheckReload}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <br />
        <br />
      </div>
    </>
  );
}

// import React from 'react';

// import { Navbar2 } from '../../components';

// export default function Dashboard(): React.ReactElement {
//   return (
//     <>
//       <Navbar2 />
//       <div>

//       </div>
//     </>
//   );
// }
