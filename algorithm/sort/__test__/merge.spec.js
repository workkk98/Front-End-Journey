const assert = require('assert').strict;
const cases = require('./cases');
const sort = require('../merge/index');
const mergeSort2 = require('../merge/test2');

cases.forEach(function (sample) {
  let copy = sample.slice();
  assert.deepEqual(sort(sample), copy.sort((a, b) => a - b));
})

cases.forEach(function (sample) {
  let copy = sample.slice();
  assert.deepEqual(mergeSort2(sample), copy.sort((a, b) => a - b));
})