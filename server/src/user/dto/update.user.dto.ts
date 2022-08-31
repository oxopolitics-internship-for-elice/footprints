import { IsOptional, IsString } from 'class-validator';
export class SetTribeDto {
  @IsString()
  @IsOptional()
  tribe: string;
}
