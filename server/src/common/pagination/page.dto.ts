import { IsArray } from 'class-validator';
import { PageMetaDto } from './pageMeta.dto';

export class PageDto<T> {
  @IsArray()
  data: T[];

  meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
