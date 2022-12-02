import { IssueType } from '@/types/IssueTypes';

export const PollFormatter = (res: IssueType) => {
  const poll = {
    dinosaur: {
      pro: res.poll.dinosaur.pro,
      neu: res.poll.dinosaur.neu,
      con: res.poll.dinosaur.con,
    },
    elephant: {
      pro: res.poll.elephant.pro,
      neu: res.poll.elephant.neu,
      con: res.poll.elephant.con,
    },
    hippo: {
      pro: res.poll.hippo.pro,
      neu: res.poll.hippo.neu,
      con: res.poll.hippo.con,
    },
    lion: {
      pro: res.poll.lion.pro,
      neu: res.poll.lion.neu,
      con: res.poll.lion.con,
    },
    tiger: {
      pro: res.poll.tiger.pro,
      neu: res.poll.tiger.neu,
      con: res.poll.tiger.con,
    },
    total: {
      pro: res.poll.total.pro,
      neu: res.poll.total.neu,
      con: res.poll.total.con,
    },
  };
  return poll;
};

export const ScoreFormatter = (res: IssueType) => {
  const score = {
    dinosaur: {
      score: res.poll.dinosaur.pro - res.poll.dinosaur.con,
    },
    elephant: {
      score: res.poll.elephant.pro - res.poll.elephant.con,
    },
    hippo: {
      score: res.poll.hippo.pro - res.poll.hippo.con,
    },
    lion: {
      score: res.poll.lion.pro - res.poll.lion.con,
    },
    tiger: {
      score: res.poll.tiger.pro - res.poll.tiger.con,
    },
    total: {
      score: res.poll.total.pro - res.poll.total.con,
    },
  };
  return score;
};
