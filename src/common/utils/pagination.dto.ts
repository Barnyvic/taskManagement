import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskPriority } from 'src/tasks/task.enum';

export class PagingOptions {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  @IsString()
  sort?: 'asc' | 'desc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TaskPriority)
  status?: TaskPriority;
}
