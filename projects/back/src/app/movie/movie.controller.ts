import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { CustomFastifyRequest } from 'src/interfaces/config/custom-fastify-request.interface';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
    constructor(
        private readonly movieService : MovieService
    ) {}


    @Get('most-trended')
    async mostTrended( @Req() request: CustomFastifyRequest){
        return await this.movieService.mostTrended(request.user.id)
    }

    
    @Get('top-10')
    async top10Movies( @Req() request: CustomFastifyRequest){
        return await this.movieService.top10Movies(request.user.id)
    }


    @Put('like/:movieId')
    async likeOrUnlikeMovie(@Param('movieId') movieId : string , @Req() request: CustomFastifyRequest): Promise<any>{
        return await this.movieService.likeOrUnlikeMovie(request.user.id, movieId)
    }

}
