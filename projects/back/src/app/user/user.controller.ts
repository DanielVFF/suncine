import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { CustomFastifyRequest } from 'src/interfaces/config/custom-fastify-request.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('me')
    @UseGuards(AuthGuard)
    async findMany(@Req() request: CustomFastifyRequest) {
        return {
            status: "OK",
            payload: await this.userService.fetchByLogin(request.user.login)
        } 
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

}
