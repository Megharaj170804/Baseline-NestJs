import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  category?: string;
}