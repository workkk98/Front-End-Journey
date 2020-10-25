namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog { }
}

// 合并命名空间和类
class Album {
  label: Album.AlbumLabel
}
// 下面这条语句会报错。
// new Album.AlbumLabel();
namespace Album {
  export class AlbumLabel {}
}