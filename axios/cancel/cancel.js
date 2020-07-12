const custAxios = axios.create({
  baseURL: 'http://localhost:8012',
  timeout: 10000
})
const CancelToken = axios.CancelToken;

class XhrPool {
  constructor() {
    this.xhrPool = new Map();
  }
  getXhrPool (key) {
    return this.xhrPool.get(key);
  }
  setXhrPool (key, val) {
    this.xhrPool.set(key ,val)
  }
  hasSameXhr (key) {
    return this.xhrPool.has(key)
  }
}

const xhrInst = new XhrPool()

function abortSameXhr (config) {
  if(xhrInst.hasSameXhr(config.url)) {
    // 取消前一个xhr
    xhrInst.getXhrPool(config.url).cancel('Operation canceled by the user.')
  }
  return config
}

custAxios.interceptors.request.use(function (config) {
  config.cancelToken = new CancelToken((c) => config.cancel = c)
  abortSameXhr(config)
  xhrInst.setXhrPool(config.url, config)
  return config
}, function (error) {
  return Promise.reject(error);
});

custAxios.get('/api/test', {
  headers: {
    'x-customer-unique': 'first'
  }
}).then(function (res) {
  console.log(res)
}, function (error) {
  if(axios.isCancel(error)) {
    console.warn(error.message)
  } else {
    console.warn(error)
  }
})

custAxios.get('/api/test', {
  headers: {
    'x-customer-unique': 'second'
  }
}).then(function (res) {
  console.log(res)
});