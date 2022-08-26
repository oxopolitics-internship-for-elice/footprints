export interface IssueTypes {
  targetPolitician: string;
  _id: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: { pro: number; con: number; neu: number };
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
}
