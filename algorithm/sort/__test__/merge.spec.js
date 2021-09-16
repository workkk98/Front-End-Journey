const assert = require('assert').strict;
const cases = require('./cases');
const sort = require('../merge/index');

cases.forEach(function ([sample, expectd]) {
  assert.deepEqual(sort(sample), expectd);
})