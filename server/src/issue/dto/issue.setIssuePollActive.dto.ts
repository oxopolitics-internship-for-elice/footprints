import { IsBoolean } from 'class-validator';

export class SetIssuePollActiveDto {
  @IsBoolean()
  isPollActive: boolean;
}
