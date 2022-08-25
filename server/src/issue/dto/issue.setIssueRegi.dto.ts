import { IsBoolean } from 'class-validator';

export class SetIssueRegiDto {
  @IsBoolean()
  pro: boolean;

  @IsBoolean()
  con: boolean;
}
