import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const mockUsers = [
    {
      _id: 1,
      name: 'José Renato',
      email: 'z3renato@example.com',
      userName: 'z3renato',
      avatar: 'http://github.com/avatar',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      _id: 2,
      name: 'Maria Silva',
      email: 'maria@example.com',
      userName: 'maria',
      avatar: 'http://github.com/avatar',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const updatedUser = {
    _id: 1,
    name: 'José Renato updated',
    email: 'z3renato@example.com',
    userName: 'z3renato',
    avatar: 'http://github.com/avatar',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn((email) =>
              mockUsers.find((user) => user.email == email),
            ),
            create: jest.fn().mockResolvedValue(mockUsers[0]),
            update: jest.fn().mockResolvedValue(updatedUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all mock users', async () => {
      const users = await controller.findAll();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return one mock user found by email', async () => {
      const users = await controller.findOne('z3renato@example.com');
      expect(users).toEqual(mockUsers[0]);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const body: CreateUserDto = {
        userName: 'z3renato',
        email: 'z3renato.souza@gmail.com',
      };
      const create = await controller.create(body);
      expect(create).toEqual(mockUsers[0]);
    });
  });
  describe('update', () => {
    it('should update a new user', async () => {
      const body: UpdateUserDto = {
        name: 'José Renato updated',
      };
      const email = 'z3renato@example.com';
      const updated = await controller.update(email, body);
      expect(updated).toEqual(updatedUser);
    });
  });
});
