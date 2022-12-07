import { Poll } from './IssueTypes';

// export interface GraphDataType {
//   id: string[];
//   _id: string;
//   targetPolitician: string;
//   createdAt: Date;
//   regiUser: string;
//   regiStatus: string;
//   regi: { pro: number; con: number };
//   poll: Poll;
//   issueDate: Date;
//   pollDate: Date;
//   content: string;
//   isPollActive: boolean;
//   updatedAt: Date;
//   title: string;
//   link?: string;
// }

export interface GraphIssueDataType {
  issueDate: string[];
  poll: Poll[];
  content: string[];
  id: string[];
  title: string[];
}

export interface GraphDataSetsType {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  tension?: number;
  pointStyle?: React.ReactNode;
}

export interface GraphDataStateType {
  labels: string[];
  datasets: GraphDataSetsType[];
}
