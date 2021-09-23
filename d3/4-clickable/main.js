
const tree = d3.tree().nodeSize([30, 150])
console.log("Tree: ",tree)

const root = d3.hierarchy(data[0], d => d.children);
console.log("root Before: ",root);

// setTimeout(() => {
//   tree(root);
//   console.log("root After: ",root);
// }, 1000);

const container = d3.select("svg")
  .attr("viewBox", [-100, -4000, 2000, 8000])
  .append("g");

const render = () => {
  tree(root);
  console.log("root After: ",root);
  const eachNode = container 
    .selectAll("g")
    .data(root, (d) => d.data.tree_id);   // <- to identify which node got deleted.
    // but we are giving all new data???
    // no we are not re-drawing all tree,
    // we are selecting existing nodes, and giving all nodes on that
    // so let's say there are already 100 nodes, and i give 98 nodes again, how to know, which 2 are deleted
    // or 5 were deleted and 3 added. 
  
  eachNode
    .exit()
    .each(d => console.log(d))
    .remove();
  
  eachNode
    .enter()
    .append("g")
    .on("click", (a,d) => {
      console.log("A: ",a);
      console.log("clicked: ",d)
      d.data.children = undefined;
      d.children = undefined;
      d3.select(a.target).style("fill", "red")
      render();
    })
    .append("text")
    .text(d => d.data.marathi_name)
    .transition()
    .duration(1000)
    .attr("transform", (d) => `translate(${d.y},${d.x})`)
} 


render();