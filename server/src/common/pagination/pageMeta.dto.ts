import { PageOptionsDto } from './pageOptions.dto';

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
