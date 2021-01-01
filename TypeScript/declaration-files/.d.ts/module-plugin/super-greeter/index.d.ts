import { greeter } from 'super-greeter';

export module "super-greeter" {
  export interface GreeterFunction {
    hyperGreet(): void;
  }
}