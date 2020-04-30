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