import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryTribeDto {
  @IsString()
  @IsOptional()
  readonly tribe: string;
}
