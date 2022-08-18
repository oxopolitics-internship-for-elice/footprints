export interface pointsProps {
  x: number;
  y: number;
}
export interface data {
  startDate: string;
  endDate: string;
  period: number;
  cycle: number;
}
export interface line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface lineGraphProps {
  points: pointsProps[];
  data: data[];
}
