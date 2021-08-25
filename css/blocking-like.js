(async ()=> {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  const count = async () => {
    for (let index = 0; index < 10; index++) {
      await delay(1000);
      console.log(index);
    }
  }
  
  console.log("Start");
  await count();   // the default is non-blocking -> by await we make it blocking (by blocking here I mean below code, not actuall threads) 
  console.log("End");

})();