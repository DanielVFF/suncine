import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { CustomFastifyRequest } from 'src/interfaces/config/custom-fastify-request.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('me')
    @UseGuards(AuthGuard)
    async findMany(@Req() request: CustomFastifyRequest){
        return {
            status: "OK",
            payload : await this.userService.fetchByLogin(request.user.login)
        }
    }
}
