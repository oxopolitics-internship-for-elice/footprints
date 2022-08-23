import { PageOptionsDto } from './pageOptions.dto';

interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  readonly pageNum: number;
  readonly perPage: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.pageNum = pageOptionsDto.pageNum;
    this.perPage = pageOptionsDto.perPage;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.perPage);
    this.hasPreviousPage = this.pageNum > 1;
    this.hasNextPage = this.pageNum < this.pageCount;
  }
}
