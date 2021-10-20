// https://medium.com/swlh/how-does-react-hooks-re-renders-a-function-component-cc9b531ae7f0

OverReact = (function() {
  let context = {};
  let callId = -1;
  function render (Component) {
    context.Component = Component;
    const instance = Component();
    instance.render();
    // reset the callId after every render
    callId = -1;
    // ensuring that instance.render is not available out OverReact.render
    delete instance.render;
    context.instance = instance;
    return context;
  }
  function useState(initialState) {
    if (!context) {
      throw new Error('hooks can not be called with out a rendering context');    
    }
    if (!context.hooks) {
      context.hooks = [];
    }
    
    callId = callId + 1;
    
    const hooks = context.hooks;
    const currentState = hooks[callId] ? hooks[callId] : initialState;
    hooks[callId] = currentState;
    // const setState = function () {
    //   const currentCallId = callId;
    //   return function (newState) {
    //     hooks[currentCallId] = newState;
    //     render(context.Component);  
    //   }
    // }();  
    // console.log(`callId: ${callId}`);
    const closedCallId = callId;
    const setState = (newState) => {
      hooks[closedCallId] = newState;
      render(context.Component);  
    };  
  
    return [currentState, setState];
  }
  return {
    render,
    useState
  }
}());
const { render, useState } = OverReact;
function Component() {
  const [counter, setCounter] = useWrapperState(0);
  const [name, setName] = useWrapperState('foo');
  
  function plusOne() {
    setCounter(counter + 1);
  }
  
  function updateName(name) {
    setName(name);
  }
function render() {
    console.log(`rendered, counter: ${counter}, name: ${name}`);   
  }
  
  return {
    render,
    plusOne,
    updateName
  }
}
// initial render
// context is returned by the OverReact.render method
const context = render(Component);
// rendered, counter: 0, name: foo
context.instance.plusOne();
// rendered, counter: 1, name: foo
context.instance.updateName('bar');
// rendered, counter: 1, name: bar
context.instance.plusOne();
// rendered, counter: 2, name: bar
context.instance.updateName('baz');
// rendered, counter: 2, name: baz
context.instance.plusOne();
// rendered, counter: 3, name: baz

function useWrapperState(initialState){
  return useState(initialState);
}