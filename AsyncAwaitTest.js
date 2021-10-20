/////////////////// Everything was callbacks!!! /////////////////////// 
/// KotlinConf 2017 - Deep Dive into Coroutines on JVM by Roman Elizarov -> https://youtu.be/YrrUCSi72E8
// Async Programming and Project Loom by Dr Venkat Subramaniam -> https://youtu.be/UqlF6Mfhnz0

async function hello1(){
  const value = await hello2();

  let value2 = value + 2;
  
  return value2;
}

async function hello2(){}

// -> to callback -> 

function hello2(returnCallback){
  hello((value) => {

    let value2 = value + 2;
    
    returnCallback(value2);
  });
}

//////////////////////////////////////////////////////////

async function myfunc(i) {
  await new Promise(r => setTimeout(r, 3000));
  console.log("Hello");
  return new Promise(async (resolve, reject) => {
    await new Promise(r => setTimeout(r, 1000));
    // resolve(new Promise(r => setTimeout(() => {r(i)}, 5000)));
    resolve(new Promise(r => setTimeout(r.bind(this,i), 5000)));
    
  });
}

myfunc(10).then((value) => {
  console.log(value);
});

///////////////////////////////////////////////////////////////////////////

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
