import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CronSendEmailService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly userService: UserService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWD,
      },
    });
  }

  // 10 seconds interval to test
  // to set cron to run once in a day use
  // 0 8 * * *
  // starts every day at 8 am
  @Cron('*/10 * * * * *', { name: 'SendEmails' })
  async run() {
    console.log('SendEmail cron running', new Date());
    const users = await this.userService.findAll();

    // here's a good opportunity to use message-queueing if you have a lot of users (z3)
    // it's possible implements this using for of.
    // But then, it just will send next email, after the currently get sended
    await Promise.all(
      users.map((user) => this.sendEmail(user.email, 'Subject', 'email text')),
    );
  }
  async sendEmail(to: string, subject: string, text: string) {
    const message = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    console.log(message);
    try {
      const send = await this.transporter.sendMail(message);
      console.log(send.messageId);
    } catch (error) {
      if (error.code == 'EAUTH')
        console.log(`Authorization error. Check your credentials`);
      else console.log(`Error on sendmail service`, error);
    }
  }
}
