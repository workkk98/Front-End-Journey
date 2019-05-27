//封装原生ajax对象

let ajax = {
};

//判断浏览器环境，并生成相应的ajax对象 state=0
ajax.init = function (callback) {
    let self = this;
    if(window.XMLHttpRequest) {
        self.xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        try {
            self.xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            alert("您的浏览器过低");
        }
    }
    self.xhr.onload = callback;
}

//state = 1
ajax.open = function ( method , url) {
    this.xhr.open(method,url);
}

//state = 2
ajax.send = function (args) {
    this.xhr.send(args);
}

