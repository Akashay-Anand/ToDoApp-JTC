import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar2 } from '../../components';
import { useTodoContext } from '../../contexts/todo.context';
import { AccessService } from '../../services';

import TodoList from './comp/todoList.component';
import TodoTask from './comp/todoTask.component';

export default function Todo(): React.ReactElement {
  const navigation = useNavigate();
  const accessService = new AccessService();

  // import or create data variables
  const accountId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const { setTaskList } = useTodoContext();

  const getAllTaskList = async () => {
    try {
      const tasks: any = await accessService.getAllTask(accountId, token);
      setTaskList(tasks.data);
    } catch (err) {
      // console.log(err.message);
    }
  };
  useEffect(() => {
    if (!token) {
      navigation('/login');
    }
    getAllTaskList();
  }, []);

  return (
    <>
      <Navbar2 />
      <br></br>
      <div>
        <TodoTask />
        <br></br>
        <TodoList />
      </div>
      <div>
        <br /><br />
      </div>
    </>
  );
}
