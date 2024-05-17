// src/tasks/tasks.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TasksService } from '../tasks.service';
import { CreateTaskDto } from '../dto/create-tesk.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly tasksService: TasksService) {}

  @SubscribeMessage('createTask')
  async handleCreateTask(
    @MessageBody()
    data: {
      userId: string;
      createTaskData: CreateTaskDto;
    },
  ) {
    const task = await this.tasksService.createTask(
      data.userId,
      data.createTaskData,
    );
    this.server.emit('taskCreated', task);
    return task;
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(
    @MessageBody()
    data: {
      id: string;
      userId: string;
      updateTaskData: UpdateTaskDto;
    },
  ) {
    const task = await this.tasksService.updateTask(
      data.id,
      data.userId,
      data.updateTaskData,
    );
    this.server.emit('taskUpdated', task);
    return task;
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(@MessageBody() data: { id: string; userId: string }) {
    const task = await this.tasksService.deleteTask(data.id, data.userId);
    this.server.emit('taskDeleted', task);
    return task;
  }
}
