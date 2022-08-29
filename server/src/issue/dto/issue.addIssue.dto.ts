import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class AddIssueDto {
  @IsString()
  readonly targetPolitician: string;

  @IsString()
  readonly regiUser: string;

  @Type(() => Date)
  @IsDate()
  readonly issueDate: Date;

  @IsString()
  readonly content: string;

  @IsString()
  readonly title: string;
}
