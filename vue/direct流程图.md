#direct流程图

```flow
st=>start: _compile函数

op1=>operation: transclude函数
op2=>operation: compile函数
op3=>operation: compileNode函数
op4=>operation: parseText函数(解析wholeText)
con1=>condition: 普通节点或带有v指令的节点
out1=>inputoutput: template->fragment
out2=>inputoutput: tokens
e=>end: end

st->op1->out1->op2->op3->con1
con1(yes)->op4->out2

```