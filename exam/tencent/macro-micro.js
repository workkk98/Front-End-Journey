console.log('start');
setTimeout(_ => {
  console.log('start settimeout 1');
	Promise.resolve().then(_ => {
	    console.log('promise 1');
            setTimeout(_ => { console.log('inner setTimeout') }, 0)
        
	}).then(_ => {
		console.log('promise 2');
	})
}, 0)
console.log('end');

Promise.resolve().then(_ => console.log(0))

let p = new Promise((resolve) => {
  console.log(1);
  setTimeout(_ => { 
    console.log(2); 
    resolve(1)
  })
})

p.then(() => {
  console.log(3)
})

// start
// end
// 1
// 0
// start settimeout 1
// promise 1
// promise 2
// 2
// 3
// inner setTimeout