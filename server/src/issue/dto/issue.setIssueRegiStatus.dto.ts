import { IsEnum } from 'class-validator';

export enum RegiStatus {
  inactive = 'inactive',
  active = 'active',
  expired = 'expired',
}

export class SetIssueRegiStatusDto {
  @IsEnum(RegiStatus)
  RegiStatus: RegiStatus;
}
