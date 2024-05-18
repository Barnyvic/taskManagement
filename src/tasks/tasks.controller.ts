import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PagingOptions } from 'src/common/utils/pagination.dto';
import { Task, TaskDocument } from './schema/tasks.schema';
import { AuthGuard } from '@nestjs/passport';
import { TaskPriority } from './task.enum';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  async findAll(
    @Query('skip') skip?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: 'asc' | 'desc',
    @Query('status') status?: TaskPriority,
  ): Promise<TaskDocument[]> {
    const options: PagingOptions = {
      skip,
      limit,
      sort,
      status,
    };
    return this.tasksService.findAllTasks({}, options);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findTaskById(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({
    status: 403,
    description: 'You are not authorized to update this task',
  })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const { _id: userId } = req.user;
    return this.tasksService.updateTask(id, userId, updateTaskDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({
    status: 403,
    description: 'You are not authorized to delete this task',
  })
  async delete(@Param('id') id: string, @Request() req): Promise<Task> {
    const { _id: userId } = req.user;
    return this.tasksService.deleteTask(id, userId);
  }
}
