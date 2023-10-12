import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ZodValidationPipe } from 'src/lib/zod.transform';
import { CreateTaskDtoSchema, CreateTaskDtoType } from './dto/create-task.dto';
import { UpdateTaskDtoSchema,UpdateTaskDtoType } from './dto/update-task.dto';



@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body(new ZodValidationPipe(CreateTaskDtoSchema)) createTaskDto: CreateTaskDtoType) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateTaskDtoSchema) ) updateTaskDto:UpdateTaskDtoType) {
    return this.tasksService.update(+id,updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
