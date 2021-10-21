Promise._all = function (array) {
  let count = 0;
  const ans = [];

  return new Promise((resolve, reject) => {
  
    function handleReject (err) {
      reject(err);
    }

    array.forEach((proIns, index) => {
      proIns.then((data) => {
        ans[index] = data;
        count++;
        if (count === array.length) {
          resolve(ans);
        }
      }, handleReject);
    })
  })
}


