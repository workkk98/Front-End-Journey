function add (args1 , args2) {
  'use strict'
  console.log(arguments[1])
  console.log(args2)
  arguments[1] = 2 
  console.log(arguments[1])
  console.log(args2)
}

add(1)

