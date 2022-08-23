import { IsNumber, IsString } from 'class-validator';

export class SetIssueContentDto {
  @IsNumber()
  readonly _id: number;

  @IsString()
  readonly content: string;
}
