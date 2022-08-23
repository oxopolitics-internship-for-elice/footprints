import { IsBoolean, IsDate, IsString } from 'class-validator';

export class AddIssueDto {
  @IsString()
  readonly targetPoliticain: string;

  @IsString()
  readonly regiUser: string;

  @IsDate()
  readonly issueDate: Date;

  @IsDate()
  readonly pollDate: Date;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isPollActive: boolean;
}
