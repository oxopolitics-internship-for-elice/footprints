import { Type } from 'class-transformer';
import { IsDate, IsString, IsFQDN } from 'class-validator';

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

  @IsFQDN()
  readonly link: string;
}
