export type pollDeep = {
  pro: number;
  neu: number;
  con: number;
};

export type Poll = {
  dinosaur: pollDeep;
  elephant: pollDeep;
  hippo: pollDeep;
  lion: pollDeep;
  tiger: pollDeep;
  total: pollDeep;
};

export interface ResTypes {
  id: string;
  _id: string;
  targetPolitician: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: Poll;
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
  title: string;
  link?: string;
}

export interface ResDataTypes {
  id: string[];
  _id: string;
  targetPolitician: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: Poll;
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: any;
  title: string;
  link?: string;
}

type Regi = {
  pro: number;
  con: number;
};

export interface GetGraphData {
  _id: string;
  targetPolitician: string;
  regiUser: string;
  regiStatus: string;
  regi: Regi;
  regiDueDate: string;
  poll: Poll;
  issueDate: string;
  title: string;
  content: string;
  isPollActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetGraphMeta {
  pageNum: number;
  perPage: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
