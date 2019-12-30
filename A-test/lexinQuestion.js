/**
 * 乐信原题
 * 宠物店出售一种电子狗（AIDog），电子狗有白色（white）和黑色（black）两种类型，
 * 电子狗可以帮主人打扫房间（clean），定时叫醒主人（wakeUp），用户购买电子狗后可以对打扫房间的频率，以及叫醒服务的时间及声音进行设置；
（i）根据描述请写出对象：
（ii）小A想买一个白色的电子狗，每隔24个小时电子狗就进行一次房间打扫，每天早上8:30电子狗就旺旺（'wang wang'）叫醒主人，请根据描述给小Anew一个电子狗实例：
 */

// function AIDogFactory () {
//   this.type = AIDogFactory.type //设置type
//   this.timeSpan;
//   this.alarmTime;
//   this.clean = function () {
//     console.log('间隔'+this.timeSpan+" clean")
//   }
//   this.wakeUp = function () {
//     console.log(this.alarmTime + " 叫醒你")
//   }
// }
// AIDogFactory.type = '白'  // 因为这是出厂时就决定的颜色

// function AIDog (timeSpan , alarmTime) {
//   AIDogFactory.call(this)
//   this.timeSpan = timeSpan;
//   this.alarmTime = alarmTime
// }

// let dog = new AIDog('24' , '8:30')
// dog.clean()
// dog.wakeUp()
// console.log(dog)

// use ES6 class
class AIDogFactory {
  constructor() {
    
  }
}