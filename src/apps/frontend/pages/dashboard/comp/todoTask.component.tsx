import React, { useEffect } from 'react';

import InputForm from '../../../components/modal/input-form';
import ModalForm from '../../../components/modal/modal';
import { useModelContext } from '../../../contexts/modal.context';
import { useTodoContext } from '../../../contexts/todo.context';
import { AccessService } from '../../../services';
// import { head } from 'lodash';

function TodoTask(): React.ReactElement {
  const accessService = new AccessService();

  // define states
  const accountId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const { setTaskList, checkReload, setcheckReload } = useTodoContext();

  const { setFixedMode, setIsActive, setText, isActive } = useModelContext();
  useEffect(() => {
    setFixedMode(false);
    setIsActive(false);
    setText('Add task');
  }, []);

  /// toggle modal state
  const openModal = () => {
    setFixedMode(false);
    setIsActive(true);
    setText('Add task');
  };

  /// /////////////////////////////
  const getAllTaskList = async () => {
    try {
      const tasks: any = await accessService.getAllTask(accountId, token);
      setTaskList(tasks.data);
      // console.log(tasks);
    } catch (err) {
      console.log(err.message);
    }
  };

  /// //////////////////////////
  /// filterr task
  const filterPropertyReset = async () => {
    setcheckReload(!checkReload);
    await getAllTaskList();
  };
  const filterPropertyPriority = async () => {
    const priority = true;
    try {
      const tasks: any = await accessService.getTaskFiltered(
        accountId,
        token,
        priority,
      );
      setTaskList(tasks.data);
    } catch (err) {
      // console.log(err.message);
    }
  };
  //
  const filterPropertyDone = async () => {
    const isCompleted = true;
    try {
      const tasks: any = await accessService.getTaskFiltered(
        accountId,
        token,
        isCompleted,
      );
      setTaskList(tasks.data);
    } catch (err) {
      // console.log(err.message);
    }
  };
  //
  const filterPropertyPending = async () => {
    const isCompleted = false;
    try {
      const tasks: any = await accessService.getTaskFiltered(
        accountId,
        token,
        isCompleted,
      );
      setTaskList(tasks.data);
    } catch (err) {
      // console.log(err.message);
    }
  };

  return (
    <div>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={openModal}>
          Create Task
        </button>

        <div>
          {isActive && (

            <ModalForm>
              <InputForm taskObj={null} />
            </ModalForm>
          )}
        </div>
      </div>

      <br />
      <div className="text-center">
        <small>Filter: </small>

        <button onClick={filterPropertyReset} style={{ borderRadius: 15 }}>
          Reset
        </button>
        <button onClick={filterPropertyPriority} style={{ borderRadius: 15 }}>
          Priority
        </button>
        <button onClick={filterPropertyDone} style={{ borderRadius: 15 }}>
          Done
        </button>
        <button onClick={filterPropertyPending} style={{ borderRadius: 15 }}>
          Pending
        </button>
      </div>
    </div>
  );
}

export default TodoTask;
