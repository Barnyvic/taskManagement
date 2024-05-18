import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksService } from '../tasks.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { PagingOptions } from 'src/common/utils/pagination.dto';
import { TaskPriority } from '../task.enum';
import { CreateTaskDto } from '../dto/create-tesk.dto';

@WebSocketGateway()
export class TasksGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly tasksService: TasksService) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createTask')
  async handleCreateTask(
    @MessageBody()
    data: {
      userId: string;
      createTaskData: CreateTaskDto;
    },
  ) {
    const result = await this.tasksService.createTask(
      data.userId,
      data.createTaskData,
    );
    if (result.error) {
      this.server.emit('error', {
        code: result.statusCode,
        message: result.message,
      });
    } else {
      this.server.emit('taskCreated', result);
    }
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
    const result = await this.tasksService.updateTask(
      data.id,
      data.userId,
      data.updateTaskData,
    );
    if (result.error) {
      this.server.emit('error', {
        code: result.statusCode,
        message: result.message,
      });
    } else {
      this.server.emit('taskUpdated', result);
    }
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(@MessageBody() data: { id: string; userId: string }) {
    const result = await this.tasksService.deleteTask(data.id, data.userId);
    if (result.error) {
      this.server.emit('error', {
        code: result.statusCode,
        message: result.message,
      });
    } else {
      this.server.emit('taskDeleted', result.data);
    }
  }

  @SubscribeMessage('getAllTasks')
  async handleGetAllTasks(
    @MessageBody()
    data: {
      skip?: number;
      limit?: number;
      sort?: 'asc' | 'desc';
      status?: TaskPriority;
    },
  ) {
    const options: PagingOptions = {
      skip: data.skip,
      limit: data.limit,
      sort: data.sort,
    };

    const findQuery: any = {};
    if (data.status) {
      findQuery.status = data.status;
    }

    const result = await this.tasksService.findAllTasks(findQuery, options);
    if (result.error) {
      this.server.emit('error', {
        code: result.statusCode,
        message: result.message,
      });
    } else {
      this.server.emit('allTasksRetrieved', result);
    }
  }

  @SubscribeMessage('getTaskById')
  async handleGetTaskById(@MessageBody() data: { id: string }) {
    const result = await this.tasksService.findTaskById(data.id);
    if (result.error) {
      this.server.emit('error', {
        code: result.statusCode,
        message: result.message,
      });
    } else {
      this.server.emit('taskRetrieved', result);
    }
  }
}
