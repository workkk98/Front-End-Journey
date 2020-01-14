// 事件委托

const container = document.getElementById('container')
container.addEventListener('click',function (event) {
  let cbObj = {
    'butt1': function () {
      console.log('butt1')
    },
    'butt2': function () {
      console.log('butt2')
    },
    'butt3': function () {
      console.log('butt3')
    }
  }
  cbObj[event.target.id]()
},false)