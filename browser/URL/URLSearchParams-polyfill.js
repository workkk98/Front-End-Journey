const url = '?a=a&b=b&c=&c=&c';

// 就是以第一个?字符当作分隔符的
function URLSearchParams (url) {
  let i = 0;
  while (url[i] !== '?' && i < url.length) {
    i++;
  }

  let searchStr = url.slice(++i);
  if (url === void 0) {
    return {};
  }
  const urlParams = {};
  let j = 0;
  while (j < searchStr.length) {
    let stage = 0;
    let key = '',
        value = '';
    while (searchStr[j] !== '&' && j < searchStr.length) {
      if (searchStr[j] == '=' && stage === 0) {
        stage = 1;
      } else {
        if (stage === 0) {
          key += searchStr[j];
        } else {
          value += searchStr[j];
        }
      }
      ++j;
    }

    if (urlParams[key] !== void 0) {
      if (Array.isArray(urlParams[key])) {
        urlParams[key] = urlParams[key].concat(value);
      } else {
        urlParams[key] = [urlParams[key], value];
      }
    } else {
      urlParams[key] = value;
    }

    ++j;
  }
  return urlParams;
}

console.log(URLSearchParams(url));