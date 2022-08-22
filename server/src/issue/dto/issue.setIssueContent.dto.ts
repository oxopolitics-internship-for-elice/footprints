import { PartialType } from '@nestjs/mapped-types';
import { AddIssueDto } from './issue.addIssue.dto';

export class SetIssueContentDto extends PartialType(AddIssueDto) {}
