declare namespace D3 {
  export interface Selectors {
      select: {
          (selector: string): Selection;
          (element: EventTarget): Selection;
      };
  }

  export interface Event {
      x: number;
      y: number;
  }

  export interface Base extends Selectors {
      event: Event;
  }
}

// 外部命名空间声明
declare var d3: D3.Base;