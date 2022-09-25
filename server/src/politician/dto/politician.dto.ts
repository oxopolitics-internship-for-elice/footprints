import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}

export const addStub: PoliticianDto = {
  name: 'test',
  image: 'test',
  party: 'test',
};

export const getStub = (_id: string): PoliticianDto => {
  return {
    _id,
    name: 'test',
    image: 'test',
    party: 'test',
    issues: [],
  };
};
