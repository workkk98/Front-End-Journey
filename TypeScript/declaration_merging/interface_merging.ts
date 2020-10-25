interface Man {
  male: string;
  age: number;
}

interface Man {
  character: string;
}

let man: Man = {
  male: 'male',
  age: 22,
  character: 'shy'
}

interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}