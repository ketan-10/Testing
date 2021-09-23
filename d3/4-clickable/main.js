
const tree = d3.tree().nodeSize([30, 150])
console.log("Tree: ",tree)

const root = d3.hierarchy(data[0], d => d.children);
console.log("root Before: ",root);

// setTimeout(() => {
//   tree(root);
//   console.log("root After: ",root);
// }, 1000);



const render = () => {
  tree(root);
  const eachNode = d3.select("svg")
    .attr("viewBox", [-100, -100, screen.width, 100])
    .append("g")
    .selectAll("text")
    .data(root);
  
  // eachNode
  //   .exit()
  //   .remove();
  
  eachNode
    .enter()
    .append("g")
    .on("click", (_,d) => {
      console.log("clicked: ",d.data)
      d.children = null;
      render();
    })
    .append("text")
    .text(d => d.data.marathi_name)
    .transition()
    .duration(1000)
    .attr("transform", (d) => `translate(${d.y},${d.x})`)
} 


render();