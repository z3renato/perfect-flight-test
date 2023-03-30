import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { GithubModule } from 'src/github/github.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronSendEmailService } from '../cron-send-mail/cron-send-email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GithubModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService, CronSendEmailService],
})
export class UserModule {}
