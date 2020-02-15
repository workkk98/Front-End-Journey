import {show} from './src/show.ts'

const array = [1,2,3,4,5]

const squres = array.map(value => value**value)

console.log(squres)

show('Webpack')