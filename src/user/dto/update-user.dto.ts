import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, Matches, ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @ValidateIf((body) => body.name !== undefined)
  @IsString()
  @Matches(/^[\p{L}\s-]+$/u, {
    message: `name cannot contain numbers ou special characters`,
  })
  name?: string;

  @ApiPropertyOptional()
  @ValidateIf((body) => body.email !== undefined)
  @IsEmail()
  email?: string;
}
