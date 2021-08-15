let globalId = 0;
let globalParent;

// Source -> https://www.youtube.com/watch?v=YfnPk3nzWts&ab_channel=WebDevSimplified

const componentState = new Map();

export function useState(initialState){
  
  let id = globalId;
  const parent = globalParent;
  const {cache,component,props} = componentState.get(parent);
  
  if(cache[id] == null){
    cache[id] = {
      value: initialState,
    }
  };

  const setState = (newState) => {
    cache[id].value = newState;
    render(component,props,parent);
  }

  globalId++;
  return [cache[id].value, setState];
}



export function render(component, props, parent){

  const state = componentState.get(parent) || {cache: []}
  componentState.set(parent, {...state, component, props});
  globalParent = parent;
  const output = component(props);
  globalId = 0;
  parent.textContent = output;
}