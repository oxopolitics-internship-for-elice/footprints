import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class AddIssueDto {
  @IsString()
  readonly targetPolitician: string;

  @Type(() => Date)
  @IsDate()
  readonly issueDate: Date;

  @IsString()
  readonly content: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly link: string;
}
