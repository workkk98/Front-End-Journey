// declare var jQuery: (selector: string) => any

declare function jQuery (selector: string): any;
declare function jQuery (callback: () => any): any;

declare namespace jQuery {
  const version: number;
  function ajax (url: string, setting: any): void;
  namespace fn {
    function entend ():void
  }
}