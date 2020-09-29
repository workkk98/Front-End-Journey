let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          // 但是这个suit是个any类型，这是因为 this来自对象字面量里的函数表达式。
          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);


// 指定函数的上下文
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

let uiElement: UIElement = {
  addClickListener (onclick) {
    document.body.addEventListener('click', onclick);
  }
}

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
      // oops, used this here. using this callback would crash at runtime
      this.info = e.message;
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!