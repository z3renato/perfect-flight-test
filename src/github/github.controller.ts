import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubservice: GithubService) {}

  @Get('/user/:userName')
  async findUser(@Param('userName') userName: string) {
    return this.githubservice.findUser(userName);
  }
}
