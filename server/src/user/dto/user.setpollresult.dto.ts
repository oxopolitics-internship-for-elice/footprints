import { IsEnum } from 'class-validator';

enum pollKind {
  pro,
  con,
  neu,
}

export class SetPollKindDto {
  @IsEnum(pollKind)
  pollResult: pollKind;
}
