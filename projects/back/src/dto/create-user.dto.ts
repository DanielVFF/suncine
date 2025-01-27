import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'The login must be at least 3 characters long.' })
  @MaxLength(20, { message: 'The login can be at most 20 characters long.' })
  login: string;

  @IsString()
  @MinLength(8, { message: 'The password must be at least 8 characters long.' })
  password: string;

  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long.' })
  @MaxLength(50, { message: 'The name can be at most 50 characters long.' })
  name: string;


  salt?: string
}
