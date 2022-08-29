export type PoliticianIssueType = {
  _id: string;
  poll: {
    pro: number;
    neu: number;
    con: number;
  };
  issueDate: string;
  totalPolls: number;
  score: number;
  targetPolitician: string;
};

export interface PoliticiansTypes {
  _id: string;
  name: string;
  issues: PoliticianIssueType[];
}
