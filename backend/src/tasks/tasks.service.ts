import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = new this.taskModel({
      ...createTaskDto,
      userId: new Types.ObjectId(userId),
    });
    return task.save();
  }

  async findAll(userId: string, filterDto?: FilterTaskDto): Promise<Task[]> {
    const filter: any = { userId: new Types.ObjectId(userId) };

    if (filterDto?.status) {
      filter.status = filterDto.status;
    }

    if (filterDto?.category) {
      filter.category = filterDto.category;
    }

    return this.taskModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    }).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      },
      { ...updateTaskDto, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.taskModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    }).exec();

    if (!result) {
      throw new NotFoundException('Task not found');
    }
  }
}
