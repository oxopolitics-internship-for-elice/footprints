import { IsArray } from 'class-validator';

export class PageOptionsDto {
  constructor(pageNum: number, perPage: number) {
    this.pageNum = pageNum;
    this.perPage = perPage;
  }
  readonly pageNum?: number;
  readonly perPage?: number;
  get skip(): number {
    return (this.pageNum - 1) * this.perPage;
  }
}

interface PageMetaDtoParameters {
  pageOptions: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  readonly pageNum: number;
  readonly perPage: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptions, itemCount }: PageMetaDtoParameters) {
    this.pageNum = pageOptions.pageNum;
    this.perPage = pageOptions.perPage;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.perPage);
    this.hasPreviousPage = this.pageNum > 1;
    this.hasNextPage = this.pageNum < this.pageCount;
  }
}

export class PageDto<T> {
  @IsArray()
  data: T[];

  meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
