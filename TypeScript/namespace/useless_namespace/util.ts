/**
 * @file 不必要的命名空间
 */

export namespace Util {
  export function add (...args: Array< number >) {
    let sum = 0;
    return args.map((val) => val+sum);
  }
} 