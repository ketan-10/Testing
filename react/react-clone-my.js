// https://medium.com/swlh/how-does-react-hooks-re-renders-a-function-component-cc9b531ae7f0

let inProcessComponent;

let currentState = [];
let hookIndex = 0;

function render(component) {
  inProcessComponent = component;
  const c =  component();
  hookIndex = 0;
  return c;
}


function useState(initialState) {

  hookIndex++;

 
  const savedState = currentState[hookIndex] || initialState;

  currentState[hookIndex] = savedState;

  const closedHookIndex = hookIndex;

  function setState(newState){
      // re-render component (closured under current render)
      currentState[closedHookIndex] = newState;
      console.log(render(inProcessComponent).render)
  }

  return [savedState, setState];
}



function MyComponent() {

  const [state, setState] = useState(0);


  function updateState(updatedState){
    setState(updatedState);
  }

  return {
    render: `Rendering State: ${state}`,
    updateState: updateState,
  } 
    
}


// first time render
// const firstTimeRender = MyComponent();

const firstTimeRender = render(MyComponent);

console.log(firstTimeRender.render);

firstTimeRender.updateState(1);