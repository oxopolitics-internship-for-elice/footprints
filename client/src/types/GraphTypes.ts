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

export interface GraphDataType {
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
