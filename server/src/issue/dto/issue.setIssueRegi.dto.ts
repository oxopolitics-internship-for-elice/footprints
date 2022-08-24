import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';

class RegiObject {
  @IsBoolean()
  pro: boolean;

  @IsBoolean()
  con: boolean;
}

export class SetIssueRegiDto {
  // @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly _id: string;

  @ValidateNested()
  readonly poll: RegiObject;
}
