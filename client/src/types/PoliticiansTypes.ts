export type PoliticianIssueType = {
  _id: string;
  issueDate: string;
  totalPolls: number;
  score: number;
  targetPolitician: string;
};
type politicianInfo = {
  name: string;
  image: string;
  party: string;
};
export interface PoliticiansTypes {
  politicianInfo: politicianInfo[];
  _id: string;
  issues: PoliticianIssueType[];
}
