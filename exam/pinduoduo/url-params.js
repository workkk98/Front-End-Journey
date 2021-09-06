const url = "https://www.nowcoder.com/search?query=%E6%8B%BC%E5%A4%9A%E5%A4%9A%E9%9D%A2%E7%BB%8F&type=all&searchType=%E6%89%8B%E5%8A%A8%E8%BE%93%E5%85%A5";

function parseUrl (url) {
  const queryPattern = /\??(\w*=[%\w]*)&?/;
  const hashPattern = /#(\w*)/;

  let ans = {};
  let result = [];
  let temp = url;
  while (result = temp.match(queryPattern)) {
    temp = temp.slice(result.index+result[0].length)
    let [key, value] = result[1].split("=");
    if (ans.hasOwnProperty(key)) {
      ans[key] = [ans[key], value];
    } else {
      ans[key] = value;
    }
  }

  console.log(ans);
}

parseUrl(url);
