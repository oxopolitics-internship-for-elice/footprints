import { IsBoolean } from 'class-validator';

export class SetIssuePollDto {
  @IsBoolean()
  pro: boolean;

  @IsBoolean()
  neu: boolean;

  @IsBoolean()
  con: boolean;
}
