var repl = require('repl');
var con = repl.start().context;
con.msg = "example message"
con.foo = function () {
  console.log(con.msg)
}