function count(start, end) {
    console.log(start);
    let clear =setInterval(s(start,end),100)
    function s(start,end) {
        let i = start +1;
        return function () {
            if(i<=end) {
                console.log(i)
                i++;
            }
        }
    }
    return {
        cancel:function () {
            clearInterval(clear)
        }
    }
}

function name(params) {
    return function () {

    }
}