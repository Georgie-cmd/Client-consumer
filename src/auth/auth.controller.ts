import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Message } from 'src/message.event';

@ApiTags('Users')
@Controller('auth')
export class AuthController {

    constructor(@Inject('M_SERVICE') private readonly client: ClientProxy) {}

    async onApplicationBootstrap() {
        await this.client.connect()
    }

    //Login
    @ApiOperation({summary: 'Login'})
    @ApiResponse({status: 200})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.client.send<any,any>('Login...', new Message(userDto))
    }

    //Registration
    @ApiOperation({summary: 'Registration'})
    @ApiResponse({status: 200})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.client.send<any,any>('Registration...', new Message(userDto))
    }
}
