// 断言
interface Cat {
  name: string
  run(): void
}

interface Fish {
  name: string
  swim(): void
}

function isFish (animal: Cat|Fish): boolean {
  if(typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}

// 如果不在类型判断中加上(animal as Fish)就会报错
// assertion.ts:13:20 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.


// assertion 我认为是使用在 变量在执行过程中推断类型时