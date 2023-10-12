import { Injectable ,NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateTaskDtoType } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDtoType } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  //Promise c pr définir le resultat que je vais recevoire
    //readOnly c parceq on va asign q'une seule fois on va pas le chaSnger sa valeur on le prend tel q est
    constructor(private readonly prismaService:PrismaService ){}
    //Promise c pr définir le resultat que je vais recevoire
    async create(createTaskDto:CreateTaskDtoType):Promise<Task> {  
      const response=await this.prismaService.task.create({
        data:{
         title: createTaskDto.title,
         description:createTaskDto.description,
         statut:createTaskDto.statut
        }
      //ou bien ...createTaskDto
      })
      return response
    }

  async findAll() :Promise<Task[]>{
    const tasks = await this.prismaService.task.findMany()
    return tasks
  }

  async findOne(id: number):Promise<Task> {
    const task=await this.prismaService.task.findFirst({
      where:{
        id:id
      }
      
    })
    if (!task){
      throw new NotFoundException('Not Found Task !!')
    }
    return task
  }

  async update(id,updateTaskDto:UpdateTaskDtoType):Promise<Task> {
    const exist=await this.findOne(id)
    const dataTask=await this.prismaService.task.update({
      where:{
        id:exist.id
      },
      data:{
        title:updateTaskDto.title,
        description:updateTaskDto.description,
        statut:updateTaskDto.statut
      }
    })
    return dataTask

  }

  async remove(id: number) {
    const exist=await this.findOne(id)
    await this.prismaService.task.delete({
      where:{
               id:exist.id
              }
    })
    return "Task removed "
  }
}
