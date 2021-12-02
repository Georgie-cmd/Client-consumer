import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message } from './message.event';
import { Message1 } from './message1.event';


@Controller('users')
export class AppController {

  constructor(@Inject('M_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }


  //GET request
  @ApiOperation({summary: 'Getting all users'})
  @ApiResponse({status: 200})
  @Get()
  getAll() {
    //console.log(this.client);
    return this.client.send<any,any>('Getting all users...', new Message('Got all users...'))
  }

  //GET request by ID
  @ApiOperation({summary: 'Getting user by ID'})
  @ApiResponse({status: 200})
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.client.send<any,any>('Getting by ID...', new Message(id))
  }

  //GET Request by Email
  @ApiOperation({summary: 'Getting user by Email'})
  @ApiResponse({status: 200})
  @Get('/email/:email')
  getOneByEmail(@Param('email') email: string) {
    return this.client.send<any,any>('Getting by email...', new Message(email))
  }

  //POST Request
  @ApiOperation({summary: 'User\'s creating'})
  @ApiResponse({status: 200})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.client.send<any,any>('POST request by user...', new Message(userDto))
  }

  //DELETE request by ID
  @ApiOperation({summary: 'Deleting the user'})
  @ApiResponse({status: 200})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.client.send<any,any>('DELETE request by user...', new Message(id))
  }

  //PUT request by ID
  @ApiOperation({summary: 'Updating the user'})
  @ApiResponse({status: 200})
  @Put(':id')
  update(@Body() userDto: UpdateUserDto, @Param('id') id: number) {
    return this.client.send<any,any>('PUT request by user...', new Message1(userDto, id))
  }
}