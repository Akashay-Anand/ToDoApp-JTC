import {
  CreateTaskParams,
  UpdateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  Task,
  TaskWithNameExistsError,
  TaskNotFoundError,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const existingTask = await TaskRepository.taskDB.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    if (existingTask) {
      throw new TaskWithNameExistsError(params.name);
    }
    const createdTask = await TaskRepository.taskDB.create({
      account: params.accountId,
      name: params.name,
      description: params.description,
      taskType: params.taskType,
      priority: params.priority,
      isCompleted: params.isCompleted,
      dueDate: params.dueDate,
      active: true,
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async updateTask(params : UpdateTaskParams) : Promise<Task> {
    const existingTask = await TaskRepository.taskDB.findOne({
      _id: params.taskId,
      account: params.accountId,
      active: true,
    });
    if (!existingTask) {
      throw new TaskNotFoundError(params.accountId);
    }
    const updatedTask = await TaskRepository.taskDB.findByIdAndUpdate(
      {
        _id: params.taskId,
      },
      {
        $set: {
          name: params.name,
          description: params.description,
          taskType: params.taskType,
          priority: params.priority,
          isCompleted: params.isCompleted,
          dueDate: params.dueDate,
        },
      },
      {
        new: true,
      },
    );
    return TaskUtil.convertTaskDBToTask(updatedTask);
  }

  public static async completedTask(params: UpdateTaskParams): Promise<void> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          isCompleted: !task.isCompleted,
        },
      },
    );
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }
}
