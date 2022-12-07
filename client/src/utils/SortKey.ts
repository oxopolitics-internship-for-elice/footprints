import { Poll } from '@/types/IssueTypes';

export default function SortKey(body: Poll) {
  const SorkArray = {
    total: body.total,
    tiger: body.tiger,
    hippo: body.hippo,
    elephant: body.elephant,
    dinosaur: body.dinosaur,
    lino: body.lion,
  };
  return SorkArray;
}
