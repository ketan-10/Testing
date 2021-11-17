(async () => {
 
  // Questions:
  // 1. What if I rejected and resolved both at the same time? 
  // ans: If we catch the rejected, Then it will call resolve also.
  
  
  /*
    1. The leaf node will either fail or success
    2. if Leaf node fail it will be complete failure
    
    3. If Any step success it will be complete success, and return result.
  */
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }  
  const wait = (time = 1) => {
    return new Promise((resolve, reject) => setTimeout(() => {
      const number = randomIntFromInterval(1, 100);
      console.log('waited for ' + time + ' seconds; random: '+number);
      if(number > 0){
        console.log("Wait ❌ rejected")
        reject('rejected');
      }else{
        console.log("Wait ✅ resolved")
        resolve('🎊');
      }
    }, time*1000));
  }
  
  
  
  const retry = (fun, re = 3) => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await fun());
      } catch (e) {
        console.log(e);
        if(re == 1) return reject(e);
        // resolve(await retry(fun, re-1));
        resolve(retry(fun, re-1));
        // retry(fun, re-1).then(resolve).catch(reject);
      }
    });
  }
  
  
  // https://stackoverflow.com/questions/46490724/passing-another-promise-to-a-promise-handler
  
  // retry(wait)
  //   .then(val => {
  //     console.log('✔ Final : ', val);
  //   })
  //   .catch(() => {
  //     console.log('🏁 final catch');
  //   });
  
  
  // try {
  //   await retry(wait)
  // }catch(e){
  //   console.log('🏁 final catch');
  // }
  
  const retry2 = async (fun, re = 3) => {
    try {
      // return fun();
      return await fun();   // we use await here to catch error in this function itself, and not pass it. 
    }catch(e){
      console.log(e);
      if(re == 1) throw e;
      return await retry2(fun, re-1);  // not sure if await is needed here or not, it will chain anyways.
    }
  }
  // console.log(await retry2(wait));
  
  
  
  const retry3 = (fun, re = 3) => {
    return new Promise((resolve, reject) => {
      fun()
      .then(resolve)
      .catch((e) => {
        console.log(e);
        if(re == 1) return reject(e);
        resolve(retry3(fun, re-1));
      });
    });
  }
  // console.log(await retry3(wait));
  
  
  // function hello() {
  //   return wait();
  // }
  
  // try {
  //   await hello()
  // }catch(e){
  //   console.log('🏁 final catch');
  // }
  
  
  
  const retry4 = (fun, re = 3) => {
    return new Promise((resolve, reject) => {
      fun()
      .then(resolve)
      .catch((e) => {
        console.log(e);
        if(re == 1) reject(e);  // return missing here -> will retry even on fail, if we catch the error while calling retry4
        if(re == -2) return resolve(e);
        retry4(fun, re-1).then(resolve).catch(reject);
      });
    });
  }
  
  console.log(retry4(wait)
    .then(x => console.log("🎊, ",x))
    .catch(e => console.log(e))
    .then(() => console.log("🎊, finally"))
    .catch(e => console.log(e, " 2"))
  );
  
  
  const retry5 = (fun, re = 3) => {
    
    return fun()
      .catch((e) => {
        console.log(e);
        if(re == 1) throw e;
        return retry5(fun, re-1);
      });
  
  }
  
  // console.log(retry5(wait).catch(e => console.log(e)));
  
  
  const retry6 = (fun, re = 3) => {
    
    return fun()
      .catch((e) => {
        console.log(e);
        if(re == 1) throw e;
        // await new Promise(r => setTimeout(r, 1000));
        return new Promise(r => setTimeout(() => r(retry6(fun, re-1)) , 1000));
      });
  
  }
  
  // console.log(retry6(wait).catch(e => console.log(e)));
  
  
  
  
  // wait()
  // .then(val => {
  //   console.log('🎊', val); 
  // })
  // .catch(e => {
  //   console.log('⛳');
  // })
  
  //////////////// VS: //////////////// 
  
  // wait()
  // .catch(e => {
  //   console.log('⛳');
  // })
  // .then(val => {
  //   console.log('🎊', val); 
  // })
  
  
  
  
  
  
  // wait()
  // .catch(e => {
  //   console.log('⛳');
  //   return wait();
  // })
  // .catch(e => {
  //   console.log('⛳⛳');
  //   return wait();
  // })
  // .catch(e => {
  //   console.log('⛳⛳⛳');
  //   throw e;
  // })
  // .catch(e => {
  //   console.log('🏁');
  // })
  // .then(val => {
  //   console.log('🎊', val); 
  // });;
  
  
  
  
  
  })();
  
  