import { IsArray, IsString } from 'class-validator';

export class AddPoliticianDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly party: string;

  @IsArray()
  readonly issues: number[];
}
