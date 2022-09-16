export interface IssueTypes {
  targetPolitician: string;
  _id: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: { pro: number; con: number; neu: number };
  regiDueDate: Date;
  issueDate: Date;
  pollDate: Date;
  title: string;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  link?: string;
}
