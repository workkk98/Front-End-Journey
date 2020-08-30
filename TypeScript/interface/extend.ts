interface Shape {
  color: string;
}

interface Penstroke {
  penWidth: number;
}

interface Square extends Shape, Penstroke {
  sideLength: number;
}

let square = <Square>{};

square.color = 'red'

