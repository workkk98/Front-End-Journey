function submit() {
  // IE7 以上都支持了 new XMLHttpRequest()

  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;
    // console.log('每次变换的 readState', readyState)
    if(xhr.readyState === 4) {
      var textNode = document.createTextNode(xhr.responseText)
      document.body.appendChild(textNode)
      console.log(xhr.getAllResponseHeaders())
    }
  }

  // xhrReq.open(method, url, async, user, password);
  // async 默认为 true 即 请求异步
  xhr.open('get' , 'http://localhost:7012/get')
  xhr.send(null)

}

function submitP() {
  // IE7 以上都支持了 new XMLHttpRequest()

  var xhr = new XMLHttpRequest()
  catchTimeout(xhr,2000,'post请求超时错误')
  errorXHR(xhr)
  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;
    // console.log('每次变换的 readState', readyState)
    if(xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  }

  // xhrReq.open(method, url, async, user, password);
  // async 默认为 true 即 请求异步
  xhr.open('post' , 'http://localhost:7012/post')
  var formData = new FormData()
  formData.append('password' , '123456')
  // console.log(formData)
  xhr.send(formData)

}

submit()

submitP()

function catchTimeout ( xhr , timeout , message ) {
  xhr.timeout = timeout;
  xhr.ontimeout = function () {
    console.log(message)
  }
}

function errorXHR (xhr) {
  xhr.onerror = function () {
    console.error(xhr.statusText)
  }
}