import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';

class PollObject {
  @IsBoolean()
  pro: boolean;

  @IsBoolean()
  neu: boolean;

  @IsBoolean()
  con: boolean;
}

export class SetIssuePollDto {
  @IsNumber()
  readonly _id: number;

  @ValidateNested()
  readonly poll: PollObject;
}
