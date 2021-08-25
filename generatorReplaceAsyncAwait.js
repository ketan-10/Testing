const fetch = require('node-fetch');

function fetchApi(url){
  fetch(url).then((result)=>{
    const value = it.next(result);
    console.log(value);
  })
}

function getJson(response){
  response.json().then((result)=>{
    const value = it.next(result);
    console.log(value);
  });
  return "testing";
}

function promiseAll(promises){
  Promise.all(promises).then(res=>it.next(res));
}

function fetchPokemon2(url){
  return fetch(url).then(res => res.json());
} 


function* main2(){

  fetchApi("https://pokeapi.co/api/v2/type/2");
  const response = yield "hello ketan";
  const data = yield getJson(response);
  

  const promises = [];
  for(const d of data.pokemon){
    promises.push(fetchPokemon2(d.pokemon.url));
  }
  const finalData = yield promiseAll(promises);
  console.log(finalData.length);
}

const it = main2();
const val = it.next();

console.log(val);

//////////////////////////////////////////////////////////////////////////////////////////


async function fetchPokemon(url) {
  const response2 = await fetch(url);
  return await response2.json();
} 


async function main(){
  const response = await fetch("https://pokeapi.co/api/v2/type/2");
  const data = await response.json();
  

  const promises = [];
  for(const d of data.pokemon){
    promises.push(fetchPokemon(d.pokemon.url));
  }
  const finalData = await Promise.all(promises);
  console.log(finalData);
}

// main();

