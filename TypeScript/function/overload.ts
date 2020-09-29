const suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard (x: number): {suit: string; card: number; };
function pickCard (x: {suit: string; card: number;}[]): number;
function pickCard(x): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
  }
}

pickCard(2);