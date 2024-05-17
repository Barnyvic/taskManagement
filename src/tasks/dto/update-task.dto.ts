import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-tesk.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
