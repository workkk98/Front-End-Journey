// 混合类型

interface Util {
  (method: string): () => any;
  size: number;
}

let util = <Util> function (method: string) {

}

// util.name = 'name'
util.size = 32;