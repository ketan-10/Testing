

const svg = d3.select('svg');

const radius = 10;
const gap = 5;
const circleSize = 2*radius+gap;
const cousinsAbove = {}

const process = (currentData, depth) => {
  if(!cousinsAbove[depth]) cousinsAbove[depth] = 0;  

  d3.select("svg")
  .append("g")
  .selectAll("circle")
  .data(currentData)
  .enter()
  .append("circle")
    .attr("cx", d => 30 + depth*circleSize)
    .attr("cy", (d,i) => 30 + i*circleSize + cousinsAbove[depth]*circleSize)
    .attr("r", d => radius)
    .each((d,i) => {
      cousinsAbove[depth]++;
      d.children && process(d.children, depth+1);
    })
}

process(data, 0);