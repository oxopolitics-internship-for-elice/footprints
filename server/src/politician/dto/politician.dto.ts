import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PoliticianDto {
  @IsString()
  @IsOptional()
  readonly _id?: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly party: string;

  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  readonly issues?: Array<any>;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  public count?: number;

  constructor(get?: boolean) {
    if (get === true) {
      this._id = '1';
      this.count = 1;
      this.issues = [];
    }
    this.image = 'test';
    this.name = 'test';
    this.party = 'test';
  }
}
