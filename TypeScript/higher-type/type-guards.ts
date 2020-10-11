interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}


// 通常我们这里得使用断言。但通过类型保护，会方便很多。
function move (pet: Fish | Bird) {
  if (pet.swim) {
    pet.swim();
  } else {
    pet.fly();
  }
}

function move2 (pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

function isFish (pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim === void 0;
}

interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
      return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
      new SpaceRepeatingPadder(4) :
      new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}