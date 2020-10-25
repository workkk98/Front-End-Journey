// interface Clock {
//   date: string;
// }

// class CheapWatcher implements Clock {
//   date: string;
//   private price;
//   type = ''
// }

interface ClockConstructor {
  new (hour: number, minute: number); // 构造器签名
}

// 17行报错的原因，接口在定义类时，描述的是其new之后的实例的形状。而非类本身。
// 但在类当作参数时，描述的就是其函数对象的行为。
class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { } // 构造函数是静态类型，而非实例类型
}

class RolexClock {
  hour;
  minute;
  constructor (h, min) {
    this.hour = h;
    this.minute = min;
  }
}

function createClock (clock: ClockConstructor, hour, minute) {
  return new clock(hour, minute);
}

// 接口继承类
class book {
  private pages: number;
}

interface Book extends book {
  type: string;
}

class eBook extends book implements Book {
  type = 'ebook'
}