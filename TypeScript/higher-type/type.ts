type Name = string;

type myName = 'zhang' | 'hefan';

// 类型中也可以使用泛型

type Container <T> = { value: T };

// 看这个结构， 二叉树的结构，但需要改一下。

type Tree<T> = {
  value: T;
  left: Tree<T> ;
  right: Tree<T> ;
}


// 我这里想到使用接口，同样可以引用自己。
interface BinaryTree {
  value: any;
  left: BinaryTree | null;
  right: BinaryTree | null
}


// 下面的例子里表示了一个链表。一个问题，例如next就应当是个联合类型，可能是下一个节点也可能是null
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

// 下面这个理当是有问题的，因为类似递归，但不知道为什么没有报错.
// type Yikes = Array<Yikes>;
// var yikes: Yikes = [];

type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;