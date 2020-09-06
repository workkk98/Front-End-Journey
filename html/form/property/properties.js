var myForm = document.getElementById('myForm');
var myButt = document.getElementById('myButt');

console.log(myForm.elements);

const properties = [
  'action',
  'method',
  'elements',
  'submit', // 函数式提交
  'reset' // 重置表单
];

properties.forEach((property) => {
  console.log('Form表单的属性：   ', myForm[property])
})


myButt.addEventListener('click', function () {
  myForm.reset()
})