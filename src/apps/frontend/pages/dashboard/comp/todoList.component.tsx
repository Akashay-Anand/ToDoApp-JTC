import React, { useEffect } from 'react';

import Card from '../../../components/card/card';
import { useTodoContext } from '../../../contexts/todo.context';
import { AccessService } from '../../../services';

function TodoList(): React.ReactElement {
  const accessService = new AccessService();

  const { taskList, setcheckReload, checkReload } = useTodoContext();
  const accountId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');

  useEffect(() => {}, [taskList, checkReload]);

  const deleteTaskItem = async (taskId: string) => {
    try {
      await accessService.deleteTask(accountId, taskId, token);
      setcheckReload((prevValue) => !prevValue);
    } catch (err) {
      // console.log(err.message);
    }
  };

  return (
    <div className="card-deck">
          {taskList && (taskList.map((item) => (
            <div key={item.id}>
              <Card
                taskObj={item}
                deleteTask={deleteTaskItem}
              />
            </div>
          )))}
        </div>
  );
}

export default TodoList;
