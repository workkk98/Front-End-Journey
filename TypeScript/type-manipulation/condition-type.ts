// 不使用条件类型 
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

// 使用结合泛型条件类型
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
function createLabel2<T extends string | number> (nameOrId: T): NameOrId<T> {
  throw 'unimplemented';
}

let labelA = createLabel2('typescript');

// 类型推断, 划个重点T[number]，使用indexed Access Type
type ElementOfArray <T> = T extends any[] ? T[number] : T;
type Bag = number[][];
type BagElement = ElementOfArray<Bag>;
type StringAlias = ElementOfArray<string>;

// 使用infer待推断类型
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

// 分布条件类型
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;

// 避免部分条件类型
type ToArrayNoDist<T> = [T] extends [any] ? T[] : never;
type StrOrArrNoDistArr = ToArrayNoDist<string | number>;

// 验证分布条件类型的原理，执行完入参是string和number的条件类型后
// 得到string｜never这个类型也就是string，因为never和任何类型联合都是
type Bar = Exclude<string | number, string>;
type Bar2 = string | never;
