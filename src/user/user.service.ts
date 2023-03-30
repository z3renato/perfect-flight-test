import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { GithubService } from '../github/github.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly githubService: GithubService,
  ) {}
  /**
   * creates a new user busing the data provided by the user and response data from Github
   * API
   * @param {CreateUserDto} createUserDto - CreateUserDto - This is the DTO to validate fields.
   * @returns The user created
   */
  async create(createUserDto: CreateUserDto) {
    const githubUser = await this.githubService.findUser(
      createUserDto.userName,
    );

    if (!githubUser) {
      throw new NotFoundException(
        `Username ${createUserDto.userName} not found on Github`,
      );
    }
    if (!githubUser.email && !createUserDto.email) {
      throw new BadRequestException(
        `User's email not found on Github. Please, inform the e-mail`,
      );
    }
    const email = createUserDto.email || githubUser.email;
    const { name, avatar_url: avatar } = githubUser;
    const newUser = {
      ...createUserDto,
      email,
      name,
      avatar,
    };
    return this.userRepository.save(newUser);
  }

  /**
   * It returns all the users in the database
   * @returns An array of all the users in the database.
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   * It returns a user with the given email
   * @param {string} email - string - user's email.
   * @returns user if exists.
   */
  async findOne(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(`No user found with email ${email}`);
    return user;
  }

  /**
   * It finds a user by email, updates the user with the data from the updateUserDto, and returns the
   * updated user
   * @param {string} email - string - The email of the user to update.
   * @param {UpdateUserDto} updateUserDto - UpdateUserDto
   * @returns The user object with the updated fields.
   */
  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(email);
    if (!user) throw new NotFoundException(`E-mail ${email} not found`);

    const { affected } = await this.userRepository.update(email, updateUserDto);
    if (!affected) throw new BadRequestException(`E-mail ${email} not updated`);

    return {
      ...user,
      ...updateUserDto,
    };
  }

  /**
   * It returns a promise that resolves to the number of rows affected by the delete operation
   * @param {string} email - string - This is the email of the user we want to delete.
   * @returns HttpStatusCode NO_CONTENT or exceptions if user not exists.
   */
  async remove(email: string) {
    const user = await this.findOne(email);
    if (!user) {
      throw new NotFoundException(`E-mail ${email} not found`);
    }

    const { affected } = await this.userRepository.delete({ email });
    if (!affected) throw new BadRequestException(` ${email} not removed`);
  }
}
