export type PoliticianIssueType = {
  _id: string;
  issueDate: string;
  totalPolls: number;
  score: number;
  targetPolitician: string;
};
export type PoliticianInfo = {
  name: string;
};
export interface PoliticiansTypes {
  _id: string;
  name: string;
  image: string;
  party: string;
}
export interface PoliticiansTypes {
  politicianInfo: PoliticianInfo[];
  _id: string;
  issues: PoliticianIssueType[];
}

export type politicianResponse = Politician[];

export interface Politician {
  _id: string;
  issues: PoliticianIssue[];
  name: string;
  image: string;
  party: string;
  count: Count[];
}

export interface PoliticianIssue {
  _id: string;
  issueDate: string;
  totalPolls: number;
  score: number;
}

export interface Count {
  count: number;
}
