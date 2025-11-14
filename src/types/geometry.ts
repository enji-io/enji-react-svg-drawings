export interface Point {
  x: number;
  y: number;
}

export interface Bar {
  start: Point;
  end: Point;
  startOffset: Point;
  endOffset: Point;
}
