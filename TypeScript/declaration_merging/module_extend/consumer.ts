// consumer.ts
import { Observable } from "./observable";
import "./map";

let observeSymbol = new Observable(Symbol('observe'));
observeSymbol.map((symbol) => {
  return symbol.toString();
})
