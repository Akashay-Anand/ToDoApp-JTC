import React, {
  createContext, useContext, useState, ReactNode, Dispatch, SetStateAction,
} from 'react';

interface Task {
  id: string;
  account: string;
  name: string;
  description: string;
  taskType: string;
  priority: boolean;
  isCompleted: boolean;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TodoContextValues {
  taskList: Task[]; // Replace YourTaskType with the actual type of your tasks
  setTaskList: Dispatch<SetStateAction<Task[]>>;
  checkReload: boolean;
  setcheckReload: Dispatch<SetStateAction<boolean>>;
}

const TodoContext = createContext<TodoContextValues | undefined>(undefined);

export const useTodoContext = (): TodoContextValues => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

interface TodoContextProviders {
  children: ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviders> = ({
  children,
}) => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [checkReload, setcheckReload] = useState(false);

  const contextValues: TodoContextValues = {
    taskList,
    checkReload,
    setTaskList,
    setcheckReload,
  };

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};
