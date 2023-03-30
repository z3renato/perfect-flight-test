import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* Creating a new user. */
  /**
   * The function takes in a CreateUserDto object, and returns a Promise that resolves to a User object
   * @param {CreateUserDto} createUserDto - This is the DTO to validate body fields.
   * @returns user.
   */

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * It returns a list of all users
   * @returns An array of users
   */

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * @param {string} email - user e-mail.
   * @returns user if exists.
   */

  @UsePipes(ValidationPipe)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
  /**
   * update user
   * @param {string} email - The email of the user to be updated.
   * @param {UpdateUserDto} updateUserDto - This is the DTO to validate body fields.
   * @returns The user object with the updated fields or exceptions.
   */

  @UsePipes(ValidationPipe)
  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(email, updateUserDto);
  }

  /**
   * delete the user by email
   * @param {string} email - The email of the user to be deleted.
   * @returns HttpStatusCode NO_CONTENT or exceptions.
   */

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
