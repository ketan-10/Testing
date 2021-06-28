
/*

from "https://typescript-exercises.github.io/"
from "https://www.typescriptlang.org/docs/handbook/intro.html"
 

https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
https://stackoverflow.com/questions/54598322/how-to-make-typescript-infer-the-keys-of-an-object-but-define-type-of-its-value
https://www.youtube.com/watch?v=nNse0r0aRT8 -> Advance Typescript Recursive type

https://www.typescriptlang.org/play?#code/FAFwngDgpgBAElMAeA8gGgNIygDxFAOwBMBnGEkAJwEsCBzGAMhgGtEB7AMxhQD4YAvDADeAbQAqMWjAwBdAFwpRcgL6hIsBGABMqTNjyFS5KrQbM2YLj35CxlqQRkKlq4MADG7AhRgALKAAbQPYYeXhEJGFWKBAAQwJ5AEYABjQYCHZ2ACs4+W0UlTQAcjZ4gmKAH2LMnLji3jtgGBaYUtiE4vDUtGbWmqzcroLgNXVoCLAAZj0MWxFRB2lLaxQXRcRZMfAJjA6CVAN8YjJ7REdnRWUt-Vxj4woaenmACloIAFcQeQwASkF+K5ZABudxeHwgGD4XxCQ53IynDZgC5yK6qW6GE4mJ50XgvdgAI2y4XQ7y+P3+JOuAJEfRalFiH0oTkJ2VEZJAINGoNAUAoL2ERWKAWC7GKv3cQA

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */

 interface MapSubFunction<T,U>{
  (): MapSubFunction<T,U>
  (subInput:T[]): U[],
}


interface MapFunction{
  (): MapFunction,
  <T,U>(mapper:(i:T) => U): MapSubFunction<T,U>
  <T,U>(mapper:(i:T) => U,input: T[]) : U[], 
}

function map2(mapper?:any, input?:any){
  if (arguments.length === 0) {
      return map2;
  }
  if (arguments.length === 1) {  
      return function subFunction(subInput:any) {
          if (arguments.length === 0) {
              return subFunction;
          }
          return subInput.map(mapper);
      };
  }
  return input.map(mapper);
}

export const map = map2 as MapFunction;

/**
* 2 arguments passed: returns a new array
* which is a result of input being filtered using
* the specified filter function.
*
* 1 argument passed: returns a function which accepts
* an input and returns a new array which is a result
* of input being filtered using original filter
* function.
*
* 0 arguments passed: returns itself.
*
* @param {Function} filterer
* @param {Array} input
* @return {Array | Function}
*/

interface FilterSubFunction<T>{
  ():FilterSubFunction<T>,
  (input:T[]):T[],
}

interface FilterFunction {
  (): FilterFunction,
  <T>(filterer: (input:T)=>boolean): FilterSubFunction<T>,
  <T>(filterer: (input:T)=>boolean,input:T[]): T[],
}


function filter2(filterer?:any, input?:any) {
  if (arguments.length === 0) {
      return filter2;
  }
  if (arguments.length === 1) {
      return function subFunction(subInput:any) {
          if (arguments.length === 0) {
              return subFunction;
          }
          return subInput.filter(filterer);
      };
  }
  return input.filter(filterer);
}

export const filter = filter2 as FilterFunction

/**
* 3 arguments passed: reduces input array it using the
* specified reducer and initial value and returns
* the result.
*
* 2 arguments passed: returns a function which accepts
* input array and reduces it using previously specified
* reducer and initial value and returns the result.
*
* 1 argument passed: returns a function which:
*   * when 2 arguments is passed to the subfunction, it
*     reduces the input array using specified initial
*     value and previously specified reducer and returns
*     the result.
*   * when 1 argument is passed to the subfunction, it
*     returns a function which expects the input array
*     and reduces the specified input array using
*     previously specified reducer and inital value.
*   * when 0 argument is passed to the subfunction, it
*     returns itself.
*
* 0 arguments passed: returns itself.
*
* @param {Function} reducer
* @param {*} initialValue
* @param {Array} input
* @return {* | Function}
*/

interface ReduceSubSubFunction<T,U>{
  ():ReduceSubSubFunction<T,U>,
  (input:T[]): U
}

interface ReduceSubFunction<T,U>{
  (): ReduceSubFunction<T,U>,
  (initalValue: U): ReduceSubSubFunction<T,U>,
  (initalValue: U,input:T[]): U,
}

interface ReduceFunction{
  (): ReduceFunction,
  <T,U>(reducer: (acc:U,input:T)=> U): ReduceSubFunction<T,U>,
  <T,U>(reducer: (acc:U,input:T)=> U,initalValue:U):ReduceSubSubFunction<T,U>,
  <T,U>(reducer: (acc:U,input:T)=> U,initalValue:U,input:T[]):U,
}

function reduce2(reducer?: any, initialValue?:any, input?:any){
  if (arguments.length === 0) {
      return reduce2;
  }
  if (arguments.length === 1) {
      return function subFunction(subInitialValue?:any, subInput?:any) {
          if (arguments.length === 0) {
              return subFunction;
          }
          if (arguments.length === 1) {
              return function subSubFunction(subSubInput?:any) {
                  if (arguments.length === 0) {
                      return subSubFunction;
                  }
                  return input.reduce(reducer, subInitialValue);
              };
          }
      }
  }
  if (arguments.length === 2) {
      return function subFunction(subInput?:any) {
          if (arguments.length === 0) {
              return subFunction;
          }
          return subInput.reduce(reducer, initialValue);
      };
  }
  return input.reduce(reducer, initialValue);
}

export const reduce = reduce2 as ReduceFunction;

/**
* 2 arguments passed: returns sum of a and b.
*
* 1 argument passed: returns a function which expects
* b and returns sum of a and b.
*
* 0 arguments passed: returns itself.
*
* @param {Number} a
* @param {Number} b
* @return {Number | Function}
*/

interface AddSubFunction{
  ():AddSubFunction,
  (b:number): number,
}

interface AddFunction{
  (): AddFunction,
  (a:number): AddSubFunction,
  (a:number,b:number):number,
}

export function add2(a:number, b:number) {
  if (arguments.length === 0) {
      return add2;
  }
  if (arguments.length === 1) {
      return function subFunction(subB:number) {
          if (arguments.length === 0) {
              return subFunction;
          }
          return a + subB;
      };
  }
  return a + b;
}

export const add = add2 as AddFunction;

/**
* 2 arguments passed: subtracts b from a and
* returns the result.
*
* 1 argument passed: returns a function which expects
* b and subtracts b from a and returns the result.
*
* 0 arguments passed: returns itself.
*
* @param {Number} a
* @param {Number} b
* @return {Number | Function}
*/
function subtract2(a:number, b:number) {
  if (arguments.length === 0) {
      return subtract2;
  }
  if (arguments.length === 1) {
      return function subFunction(subB:number) {
          if (arguments.length === 0) {
              return subFunction;
          }
          return a - subB;
      };
  }
  return a - b;
}

export const subtract = subtract2 as AddFunction; 


/**
* 2 arguments passed: returns value of property
* propName of the specified object.
*
* 1 argument passed: returns a function which expects
* propName and returns value of property propName
* of the specified object.
*
* 0 arguments passed: returns itself.
*
* @param {Object} obj
* @param {String} propName
* @return {* | Function}
*/

interface PropSubFunction<K extends string>{
  (): PropSubFunction<K>,
  <O extends {[a in K]: O[K]}>(obj:O):O[K],
}

interface PropFunction{
  ():PropFunction,
  <K extends string>(propName:K): PropSubFunction<K>,
  <O,K extends string & keyof O>(propName:K,obj:O): O[K],
}

function prop2(obj:any, propName:any) {
  if (arguments.length === 0) {
      return prop2;
  }
  if (arguments.length === 1) {
      return function subFunction(subPropName:any) {
          if (arguments.length === 0) {
              return subFunction;
          }
          return obj[subPropName];
      };
  }
  return obj[propName];
}
export const prop = prop2 as PropFunction;

/**
* >0 arguments passed: expects each argument to be
* a function. Returns a function which accepts the
* same arguments as the first function. Passes these
* arguments to the first function, the result of
* the first function passes to the second function,
* the result of the second function to the third
* function... and so on. Returns the result of the
* last function execution.
*
* 0 arguments passed: returns itself.
*
* TODO TypeScript
*   * Should properly handle at least 5 arguments.
*   * Should also make sure argument of the next
*     function matches the return type of the previous
*     function.
*
* @param {Function[]} functions
* @return {*}
*/
export function pipe(...functions:Function[]) : Function{
  if (arguments.length === 0) {
      return pipe;
  }
  return function subFunction() {
      let nextArguments = Array.from(arguments);
      let result;
      for (const func of functions) {
          result = func(...nextArguments);
          nextArguments = [result];
      }
      return result;
  };
}
