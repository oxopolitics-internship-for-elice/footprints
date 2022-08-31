type pollDeep = {
  pro: number;
  neu: number;
  con: number;
};

type poll = {
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
  poll: poll;
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
  title: string;
}

export interface ResDataTypes {
  id: string;
  _id: string;
  targetPolitician: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: poll;
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
  title: string;
}
