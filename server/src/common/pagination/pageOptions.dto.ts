export class PageOptionsDto {
  constructor(pageNum, perPage) {
    this.pageNum = pageNum;
    this.perPage = perPage;
  }
  readonly pageNum?: number;
  readonly perPage?: number;
  get skip(): number {
    return (this.pageNum - 1) * this.perPage;
  }
}
