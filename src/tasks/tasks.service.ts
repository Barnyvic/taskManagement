import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskDto } from './dto/create-tesk.dto';
import { Task, TaskDocument } from './schema/tasks.schema';
import { PagingOptions } from 'src/common/utils/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskRepository.create(userId, createTaskDto);
  }

  async findAllTasks(
    findQuery?: any,
    options?: PagingOptions,
  ): Promise<TaskDocument[]> {
    return this.taskRepository.find(findQuery, options);
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const task = await this.taskRepository.findOne({
      _id: new Types.ObjectId(id),
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.user.toString() !== userId) {
      throw new ForbiddenException(
        `You are not authorized to update this task`,
      );
    }

    const updatedTask = await this.taskRepository.updateOne(
      new Types.ObjectId(id),
      updateTaskDto,
    );

    return updatedTask;
  }

  async deleteTask(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      _id: new Types.ObjectId(id),
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.user.toString() !== userId) {
      throw new ForbiddenException(
        `You are not authorized to delete this task`,
      );
    }

    const deletedTask = await this.taskRepository.delete(id);

    return deletedTask;
  }
}
