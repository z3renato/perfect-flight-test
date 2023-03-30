import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { GithubService } from 'src/github/github.service';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
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

  const mockGithubService = {
    findUser(username: string) {
      if (username === 'z3renato') {
        return {
          name: 'José Renato',
          email: 'z3renato@example.com',
          avatar_url: 'http://github.com/avatar',
        };
      } else if (username === 'maria') {
        return {
          name: 'Maria Silva',
          email: 'maria@example.com',
          avatar_url: 'http://github.com/avatar',
        };
      }
      return null;
    },
  };
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn(),
          },
        },
        {
          provide: GithubService,
          useValue: {
            findUser: jest.fn((userName) =>
              mockGithubService.findUser(userName),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
