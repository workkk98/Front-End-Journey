function a() {
  console.dir(new.target)
}

new a() // [Function a]

a() // undefined