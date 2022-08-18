import { IsBoolean, IsDate, IsObject, IsString } from 'class-validator';

export class CreateIssueDto {
  @IsString({ each: true })
  readonly targetPoliticain: number[];

  @IsDate()
  readonly createdAt: Date;

  @IsString({ each: true })
  readonly regiUser: number[];

  @IsString()
  readonly regiStatus: string;

  @IsObject()
  readonly regi: object;

  @IsObject()
  readonly poll: object;

  @IsDate()
  readonly issueDate: Date;

  @IsDate()
  readonly pollDate: Date;

  @IsString()
  readonly content: string;

  @IsBoolean()
  readonly isPollActive: boolean;
}
