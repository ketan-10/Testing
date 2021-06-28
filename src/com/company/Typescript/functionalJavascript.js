function toFunctional(func) {
  const fullArgCount = func.length;
  function createSubFunction(curriedArgs) {
      return function () {
          const newCurriedArguments = curriedArgs.concat(Array.from(arguments));
          console.log(newCurriedArguments);
          if (newCurriedArguments.length > fullArgCount) {
              throw new Error('Too many arguments');
          }
          if (newCurriedArguments.length === fullArgCount) {
              return func.apply(this, newCurriedArguments);
          }
          return createSubFunction(newCurriedArguments);
      };
  }
  return createSubFunction([]);
}


const map = toFunctional((fn, input) => input.map(fn));
const reduce = toFunctional((reducer, initialValue, input) => input.reduce(reducer, initialValue));


// map(10)


function toFunctional1(fun){

  const totalArguments = fun.length;
  const currentArgs = [];

  return function hello(...args) {
    currentArgs.push.apply(currentArgs,Array.from(args));

    console.log(args);
    console.log(currentArgs);
    console.log("")
    if(currentArgs.length > totalArguments) throw new Error("too many");

    if(currentArgs.length == totalArguments) return fun.apply(this,currentArgs);

    return hello;

  }

}

const add = toFunctional1((a, b,c) => a + b + c);
// const one = add(10);
// console.log(one(20)(30));

const prop = toFunctional((obj, propName) => obj[propName]);

const output = prop()('x')()({x: 1, y: 'Hello'})
console.log(output);


