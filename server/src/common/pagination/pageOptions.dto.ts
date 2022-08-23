import { Type } from 'class-transformer';
import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @IsOptional()
  @IsEnum(Order)
  readonly order?: Order = Order.ASC;

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
