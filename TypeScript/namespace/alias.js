var check;
(function (check) {
    function checkArray(instance) {
        return instance instanceof Array;
    }
    check.checkArray = checkArray;
})(check || (check = {}));
var checkArray = check.checkArray;
console.log(checkArray([]));
