import { GraphDataType } from '@/types/GraphTypes';

const MinMax = (res: GraphDataType) => {
  const tempMinMax = res.score.map((score: any) => {
    return [
      score.dinosaur.score,
      score.elephant.score,
      score.hippo.score,
      score.lion.score,
      score.tiger.score,
      score.total.score,
    ];
  });
  let minmax: number[] = [];
  tempMinMax.forEach((element: any) => {
    minmax = [...minmax, ...element];
  });
  return [Math.max(...minmax), Math.min(...minmax)];
};

export default MinMax;
