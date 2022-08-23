import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';

class RegiObject {
  @IsBoolean()
  pro: boolean;

  @IsBoolean()
  con: boolean;
}

export class SetIssueRegiDto {
  @IsNumber()
  readonly _id: number;

  @ValidateNested()
  readonly poll: RegiObject;
}
