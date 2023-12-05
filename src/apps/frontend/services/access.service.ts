import APIService from './api.service';

export default class AccessService extends APIService {
  login(username: string, password: string): Promise<void> {
    return this.apiClient.post('/accounts/login', {
      username,
      password,
    });
  }

  register(
    name: string,
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    return this.apiClient.post('/accounts/create', {
      name,
      username,
      email,
      password,
    });
  }

  getToken(username: string, password: string): Promise<void> {
    return this.apiClient.post('/token-api/access-tokens', {
      username,
      password,
    });
  }

  createTask(
    accountId: string,
    name: string,
    description: string,
    taskType: string,
    priority: boolean,
    isCompleted: boolean = false,
    token: string,
    dueDate?: string,
  ): Promise<void> {
    const headers = {
      authorization: `checkpoint ${token}`,
    };
    return this.apiClient.post(
      `/accounts/${accountId}/tasks`,
      {
        name,
        description,
        taskType,
        priority,
        isCompleted,
        dueDate,
      },
      { headers },
    );
  }

  getAllTask(accountId: string, token: string): Promise<void> {
    const headers = {
      authorization: `checkpoint ${token}`,
    };
    return this.apiClient.get(`/accounts/${accountId}/tasks`, { headers });
  }

  deleteTask(accountId: string, taskId: string, token: string): Promise<void> {
    const headers = {
      authorization: `checkpoint ${token}`,
    };
    return this.apiClient.delete(`/accounts/${accountId}/tasks/${taskId}`, {
      headers,
    });
  }

  completedTask(
    accountId: string,
    taskId: string,
    token: string,
  ): Promise<void> {
    const headers = {
      authorization: `checkpoint ${token}`,
    };
    return this.apiClient.patch(`/accounts/${accountId}/task/${taskId}`, {
      headers,
    });
  }

  updateTask(
    accountId: string,
    taskId: string,
    name: string,
    description: string,
    taskType: string,
    priority: boolean,
    isCompleted: boolean,
    token: string,
    dueDate?: string,
  ): Promise<void> {
    const headers = {
      authorization: `checkpoint ${token}`,
    };
    return this.apiClient.put(
      `/accounts/${accountId}/tasks/${taskId}`,
      {
        name,
        description,
        taskType,
        priority,
        isCompleted,
        dueDate,
      },
      { headers },
    );
  }

  getTaskFiltered(
    accountId: string,
    token: string,
    isCompleted?: boolean,
    priority?: boolean,
    overdue?: boolean,
  ): Promise<void> {
    const headers = {
      authorization: `checkpoint ${token}`,
    };
    return this.apiClient.post(
      `/accounts/${accountId}/tasks/filter`,
      {
        isCompleted,
        priority,
        overdue,
      },
      { headers },
    );
  }
}
