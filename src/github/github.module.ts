import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';

@Module({
  imports: [HttpModule],
  providers: [GithubService],
  controllers: [GithubController],
  exports: [GithubService],
})
export class GithubModule {}
