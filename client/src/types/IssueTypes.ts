import { Poll } from './GraphTypes';

export interface IssueType {
  _id: string;
  targetPolitician: string;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  regiDueDate?: string;
  poll: Poll;
  issueDate: string;
  title: string;
  content: string;
  isPollActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  score: number;
  link?: string;
}

export interface IssueMeta {
  pageNum: number;
  perPage: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
