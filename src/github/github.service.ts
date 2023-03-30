import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GithubUser } from 'src/consts/github-user.type';

/* It's a service that uses the Github API to find users */
@Injectable()
export class GithubService {
  usersPath: string;
  constructor(private readonly httpService: HttpService) {
    this.usersPath = process.env.GITHUB_API_BASEURL + '/users';
  }

  /**
   * It returns a promise that resolves to a GithubUser object or null
   * @param {string} userName - string - The username of the user we want to find.
   * @returns A promise that resolves to a GithubUser or null.
   */
  async findUser(userName: string): Promise<GithubUser | null> {
    const { data: userInfo } = await firstValueFrom(
      this.httpService.get(`${this.usersPath}/${userName}`),
    );
    return userInfo;
  }
}
