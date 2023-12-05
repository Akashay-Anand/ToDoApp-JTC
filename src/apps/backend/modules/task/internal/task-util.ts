import { Task } from '../types';

import { TaskDB } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.name = taskDb.name;
    task.description = taskDb.description;
    task.taskType = taskDb.taskType;
    task.priority = taskDb.priority;
    task.isCompleted = taskDb.isCompleted;
    task.dueDate = taskDb.dueDate;
    task.createdAt = taskDb.createdAt;
    task.updatedAt = taskDb.updatedAt;

    // console.log(taskDb);
    return task;
  }
}
