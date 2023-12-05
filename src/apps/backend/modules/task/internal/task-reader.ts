import {
  GetAllTaskParams,
  GetTaskParams,
  Task,
  TaskNotFoundError,
  PaginationParams,
  GetTaskByNameParams,
  TaskWithNameNotFoundError,
  GetTaskFiltere,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskReader {
  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
    const task = await TaskRepository.taskDB.findOne({
      _id: params.taskId,
      account: params.accountId,
      active: true,
    });
    if (!task) {
      throw new TaskNotFoundError(params.taskId);
    }
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async getTaskByNameForAccount(
    params: GetTaskByNameParams,
  ): Promise<Task> {
    const task = await TaskRepository.taskDB.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    if (!task) {
      throw new TaskWithNameNotFoundError(params.name);
    }
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async getTasksForAccount(
    params: GetAllTaskParams,
  ): Promise<Task[]> {
    const totalTasksCount = await TaskRepository.taskDB.countDocuments({
      account: params.accountId,
      active: true,
    });
    const paginationParams: PaginationParams = {
      page: params.page ? params.page : 1,
      size: params.size ? params.size : totalTasksCount,
    };
    const startIndex = (paginationParams.page - 1) * paginationParams.size;
    const tasks = await TaskRepository.taskDB
      .find({ account: params.accountId, active: true })
      .sort({ createdAt: -1 })
      .limit(paginationParams.size)
      .skip(startIndex);
    return tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
  }

  public static async getTasksFiltered(
    params: GetTaskFiltere,
  ): Promise<Task[]> {
    if (params.overdue === true) {
      const currentDate = new Date();
      const tasks = await TaskRepository.taskDB
        .find({
          account: params.account,
          active: true,
          dueDate: { $t: new Date(currentDate.toISOString()) },
        })
        .sort({ dueDate: -1 });
      return tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
    }
    // else {
    const tasks = await TaskRepository.taskDB
      .find(params)
      .sort({ createdAt: -1 });
    return tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
    // }
  }
}
