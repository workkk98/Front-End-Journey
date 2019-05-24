function Father () {
    this.name = 'father';
    var sayName = function () {
        console.log(this.name);
    }
}

Father.prototype.grandPa = function () {
    console.log('I am grandPa');
}

function Son () {
    this.role = 'son';
}

Son.prototype = new Father();
