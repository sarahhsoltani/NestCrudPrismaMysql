import { Injectable, NotFoundException ,ConflictException} from '@nestjs/common';
import {  CreateUserDtoType } from './dto/create-user.dto';
import { UpdateUserDtoType } from './dto/update-user.dto';
import { PrismaService } from 'src/lib/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
constructor(private readonly prismaService:PrismaService){}
//Cripter Password
 async encryption (password:string){
  const hash = await bcrypt.hashSync(password, 10);
  return hash
}
//Find User by email
async findUserbyEmail(email:string){
return await this.prismaService.user.findFirst({
  where:{
    email:email
  }
})
}


  async create(createUserDto: CreateUserDtoType):Promise<User> {
    const exitEmail=await this.findUserbyEmail(createUserDto.email)
    if(exitEmail){
      throw new ConflictException('user exist')
    }
    const response=await this.prismaService.user.create({
      data:{
        name:createUserDto.name,
        email:createUserDto.email,
        password:await this.encryption(createUserDto.password),
        birthday:createUserDto.birthday  
      }
    })  
    return response;
  }

  async findAll() {
    const task=await this.prismaService.user.findMany({
      select:{
        id:true,
        name:true,
        email:true,
        birthday:true,
        image:true,
        role:true
      }
    })
    return task
  }

 async findOne(id: number) {
    const user=await this.prismaService.user.findFirst({
      where :{
        id:id
      }
    })
    if(!user){
      throw new NotFoundException("Not found User !!")
    }
   const {password,...rest} =user;
    return rest
  }

  async update(id: number, updateUserDto: UpdateUserDtoType) {
    const exist=await this.findOne(id)
    updateUserDto.password=await this.encryption(updateUserDto.password)
const user=this.prismaService.user.update({
  where:{
    id:exist.id
  },
  data: updateUserDto
  
 })
 const {password,...rest} =user;
    return rest
  }

async  remove(id: number) {
    const exist=await this.findOne(id)
await this.prismaService.user.delete({
  where:{
    id:exist.id
  }
})
   return "User deleted"
  }
 

}  
