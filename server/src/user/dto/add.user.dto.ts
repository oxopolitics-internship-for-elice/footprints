import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly userName: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  @IsOptional()
  readonly role: string;
  @IsString()
  @IsOptional()
  readonly userStatus: string;
}
