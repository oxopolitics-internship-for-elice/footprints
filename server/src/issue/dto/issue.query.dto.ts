import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PageOptionsDto } from 'src/common/pagination/pageOptions.dto';

export class QueryIssueDto {
  @IsString()
  readonly targetPolitician: string;

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

  get pageOptions(): PageOptionsDto {
    return new PageOptionsDto(this.pageNum, this.perPage);
  }
}
