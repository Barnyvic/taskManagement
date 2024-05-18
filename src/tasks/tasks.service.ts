import { Injectable, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { PagingOptions } from 'src/common/utils/pagination.dto';
import { CreateTaskDto } from './dto/create-tesk.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(userId: string, createTaskDto: CreateTaskDto): Promise<any> {
    try {
      const newTask = await this.taskRepository.create(userId, createTaskDto);
      return {
        error: false,
        statusCode: HttpStatus.CREATED,
        message: 'Task created successfully.',
        data: newTask,
      };
    } catch (error) {
      const statusCode = error.message.includes('Task validation failed')
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
      return {
        error: true,
        statusCode,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      };
    }
  }
  async findAllTasks(findQuery?: any, options?: PagingOptions): Promise<any> {
    try {
      const query: any = {};
      if (options?.status) {
        findQuery.status = options.status;
      }
      const tasks = await this.taskRepository.find(query, options);
      return {
        error: false,
        statusCode: HttpStatus.OK,
        message: 'Tasks retrieved successfully.',
        data: tasks,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      };
    }
  }

  async findTaskById(id: string): Promise<any> {
    try {
      const task = await this.taskRepository.findOne({
        _id: new Types.ObjectId(id),
      });
      if (!task) {
        return {
          error: true,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Task with ID ${id} not found`,
          data: null,
        };
      }
      return {
        error: false,
        statusCode: HttpStatus.OK,
        message: 'Task retrieved successfully.',
        data: task,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      };
    }
  }

  async updateTask(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<any> {
    try {
      const task = await this.taskRepository.findOne({
        _id: new Types.ObjectId(id),
      });

      if (!task) {
        return {
          error: true,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Task with ID ${id} not found`,
          data: null,
        };
      }

      if (task.user.toString() !== userId.toString()) {
        return {
          error: true,
          statusCode: HttpStatus.FORBIDDEN,
          message: `You are not authorized to update this task`,
          data: null,
        };
      }

      const updatedTask = await this.taskRepository.updateOne(
        new Types.ObjectId(id),
        updateTaskDto,
      );

      return {
        error: false,
        statusCode: HttpStatus.OK,
        message: 'Task updated successfully.',
        data: updatedTask,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      };
    }
  }

  async deleteTask(id: string, userId: string): Promise<any> {
    try {
      const task = await this.taskRepository.findOne({
        _id: new Types.ObjectId(id),
      });

      if (!task) {
        return {
          error: true,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Task with ID ${id} not found`,
          data: null,
        };
      }

      if (task.user.toString() !== userId.toString()) {
        return {
          error: true,
          statusCode: HttpStatus.FORBIDDEN,
          message: `You are not authorized to delete this task`,
          data: null,
        };
      }

      const deletedTask = await this.taskRepository.delete(id);

      return {
        error: false,
        statusCode: HttpStatus.OK,
        message: 'Task deleted successfully.',
        data: deletedTask,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'An unexpected error occurred.',
        data: null,
      };
    }
  }
}
