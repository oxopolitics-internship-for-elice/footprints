import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryIssueDto {
  @IsString()
  readonly targetPolitician: number;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
  })
  @IsBoolean()
  @IsOptional()
  readonly regiStatus: boolean;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
  })
  @IsBoolean()
  @IsOptional()
  readonly ranked?: boolean;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly pageNum?: number = 1;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsOptional()
  readonly perPage?: number = 10;

  get skip(): number {
    return (this.pageNum - 1) * this.perPage;
  }
}
