import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { TaskPriority } from '../task.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Finish report', description: 'Title of the task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Complete the annual report by Friday',
    description: 'Description of the task',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the task',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    example: TaskPriority.Low,
    description: 'Priority of the task',
    enum: TaskPriority,
    required: false,
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    example: '2024-05-31',
    description: 'Due date of the task',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}
