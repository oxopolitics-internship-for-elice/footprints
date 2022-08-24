import { Transform, Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsObject,
} from 'class-validator';

export class SetIssueRegiDto {
  @IsBoolean()
  pro: boolean;

  @IsBoolean()
  con: boolean;
}
