import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { HttpModule } from 'src/infra/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [TmdbService],
})
export class TmdbModule {}
