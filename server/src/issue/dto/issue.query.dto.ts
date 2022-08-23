import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class QueryIssueDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly targetPolitician?: number;

  @IsBoolean()
  readonly regiStatus!: boolean;

  @IsBoolean()
  @IsOptional()
  readonly ranked?: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly pageNum?: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly perPage?: number = 10;

  get skip(): number {
    return (this.pageNum - 1) * this.perPage;
  }
}
