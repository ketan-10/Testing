console.log("start");

async function test(){
    console.log("1")
  for(let i=0;i<3;i++){
    console.log(await new Promise((resolve, reject) => setTimeout(()=>resolve(i), 1000)));
  }
    

}

test();
console.log("end");


********************


console.log("start");

async function test(){
    console.log("1")
  for(let i=0;i<3;i++){
    console.log(await new Promise((resolve, reject) => {for(let k=0;k<1000000000;k++){}; resolve(i) }));
  }
    

}

test();
console.log("end");

**************************


async function test2(){
console.log("start");

async function test(){
    console.log("1")
  for(let i=0;i<3;i++){
    console.log(await new Promise((resolve, reject) => {for(let k=0;k<1000000000;k++){}; resolve(i) }));
  }
    

}
console.log("mid");
await test();
console.log("end");
}

undefined
console.log("ketan1")
test2()
console.log("kte2");


***OUT**


ketan1
start
mid
1    // see it got inside await too 
kte2
0
1
2




console.log("start")
let ketan = new Promise((resolve, reject) => {for(let k=0;k<1000000000;k++){}; console.log("done");resolve("ok") })
console.log("end")


console.log("start")
let ketan = new Promise((resolve, reject) => {setTimeout(()=>{for(let k=0;k<1000000000;k++){}; console.log("done");resolve("ok")},4000) })
console.log("end")
