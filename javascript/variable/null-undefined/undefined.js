function foo () {
  var undefined = 'foo';
  console.log('undefined:', undefined);

  var bar = undefined;
  console.log('bar:', bar);
}

foo();