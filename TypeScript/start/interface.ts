interface Person {
  name: string
  age: number
  // 可选属性 job
  job?: string
  // 任意属性
  [propName: string]: any
  readonly country: string
}

const jc: Person = {
  name: 'clarkson',
  age: 60,
  fridens: ['rh', 'jm'],
  country: 'UK'
}

interface Car {
  readonly name: string
  price: number
  maker? : string
  [propName: string]: any
}

// const BMW: Car = {
//   name: '330'
// }

// BMW.name = '325li'


// 关于任意属性, 任意属性指定了整个接口所有属性的类型都得是它的子集
interface hospital {
  level: string,
  people: number,
  [propName: string]: string
}

const yuHanghospital: hospital = {
  level: '三乙',
  people: null
}