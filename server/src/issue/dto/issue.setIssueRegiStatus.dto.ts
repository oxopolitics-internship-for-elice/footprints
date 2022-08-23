import { IsEnum } from 'class-validator';

enum RegiStatus {
  'inactive',
  'active',
  'expired',
}

export class SetIssueRegiStatusDto {
  @IsEnum(RegiStatus)
  RegiStatus: RegiStatus;
}
