import { NextFunction, Request, Response } from 'express';

import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  UpdateTaskParams,
  GetTaskFiltere,
} from '../types';

export default class TaskController {
  public static async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: CreateTaskParams = {
        accountId: req.params.accountId,
        name: req.body.name as string,
        description: req.body.description,
        taskType: req.body.taskType,
        priority: req.body.priority,
        isCompleted: req.body.isCompleted,
        dueDate: req.body.dueDate,
      };
      const task: Task = await TaskService.createTask(params);
      res.status(201).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  // modify it
  public static async updateTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: UpdateTaskParams = {
        accountId: req.params.accountId, // form url
        taskId: req.params.id, // from url

        name: req.body.name, // from body
        description: req.body.description,
        taskType: req.body.taskType,
        priority: req.body.priority,
        isCompleted: req.body.isCompleted,
        dueDate: req.body.dueDate,
      };
      const task: Task = await TaskService.updateTask(params);
      res.status(201).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  public static async completedTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: UpdateTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      await TaskService.completedTask(params);
      res.status(201).send({ message: 'success' });
    } catch (e) {
      next(e);
    }
  }

  public static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: DeleteTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      await TaskService.deleteTask(params);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  public static async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = +req.query.page;
      const size = +req.query.size;
      const params: GetAllTaskParams = {
        accountId: req.params.accountId,
        page,
        size,
      };
      const tasks = await TaskService.getTasksForAccount(params);
      res
        .status(200)
        .send(tasks.map((task) => TaskController.serializeTaskAsJSON(task)));
    } catch (e) {
      next(e);
    }
  }

  public static async getTaskFiltered(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTaskFiltere = {
        account: req.params.accountId,
        active: true,
      };

      if (req.body.isCompleted !== undefined) {
        params.isCompleted = req.body.isCompleted;
      } else if (req.body.priority !== undefined) {
        params.priority = req.body.priority;
      } else if (req.body.overdue !== undefined) {
        params.overdue = req.body.overdue;
      }
      const tasks = await TaskService.getTasksFiltered(params);
      res
        .status(200)
        .send(tasks.map((task) => TaskController.serializeTaskAsJSON(task)));
    } catch (e) {
      next(e);
    }
  }

  public static async getTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      const task = await TaskService.getTaskForAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  private static serializeTaskAsJSON(task: Task): unknown {
    return {
      id: task.id,
      account: task.account,
      name: task.name,
      description: task.description,
      taskType: task.taskType,
      priority: task.priority,
      isCompleted: task.isCompleted,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
