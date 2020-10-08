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