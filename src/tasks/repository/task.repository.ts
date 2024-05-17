/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { PagingOptions } from '../../common/utils/pagination.dto';
import { Task, TaskDocument } from '../schema/tasks.schema';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(userId: string, task: Partial<Task>): Promise<Task> {
    const createdTask = new this.taskModel({
      ...task,
      user: new Types.ObjectId(userId),
    });
    return createdTask.save();
  }

  public async find(
    findQuery?: FilterQuery<TaskDocument>,
    option?: PagingOptions,
    extra?: any,
  ): Promise<TaskDocument[]> {
    const sort = option.sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };

    return this.taskModel
      .find(findQuery)
      .skip(option?.skip)
      .limit(option?.limit)
      .sort(option?.sort)
      .exec();
  }

  async findOne(query: FilterQuery<TaskDocument>): Promise<Task | null> {
    return this.taskModel.findOne(query).exec();
  }

  public async updateOne(
    id: Types.ObjectId,
    updateQuery: UpdateQuery<Partial<TaskDocument>>,
  ): Promise<TaskDocument> {
    return this.taskModel.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
    });
  }

  async delete(id: string): Promise<Task | null> {
    return this.taskModel
      .findOneAndDelete({
        _id: new Types.ObjectId(id),
      })
      .exec();
  }
}
