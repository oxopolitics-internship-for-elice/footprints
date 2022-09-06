export type PoliticianIssueType = {
  _id: string;
  issueDate: string;
  totalPolls: number;
  score: number;
};
export interface PoliticiansTypes {
  _id: string;
  issues: PoliticianIssueType[];
  image: string;
  name: string;
  party: string;
}
