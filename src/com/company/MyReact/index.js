import Component from './Component.js'
import {render} from './MyReact.js'

let propCount = 0;

function renderComponent(){
  render(Component, { propCount: propCount }, document.getElementById("root"));
  render(Component, { propCount: propCount }, document.getElementById("root2"));
}

renderComponent();

document.getElementById("btn-count").addEventListener("click", function(){
  propCount++;
  renderComponent();
})