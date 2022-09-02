import { IsString, IsOptional } from 'class-validator';

export class AddUserPollDto {
  @IsString()
  readonly userName: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  @IsOptional()
  readonly role?: string;
  @IsString()
  @IsOptional()
  readonly userStatus?: string;
  @IsString()
  readonly tribe?: string;
}
