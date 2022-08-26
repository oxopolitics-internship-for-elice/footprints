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
};

export interface PoliticiansTypes {
  [key: string]: PoliticianIssueType[];
}
