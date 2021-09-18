

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