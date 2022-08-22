import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class AddIssueDto {
  @IsString()
  readonly targetPoliticain: string;

  @IsString()
  readonly regiUser: string;

  @Type(() => Date)
  @IsDate()
  readonly issueDate: Date;

  @Type(() => Date)
  @IsDate()
  readonly pollDate: Date;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isPollActive: boolean;
}
