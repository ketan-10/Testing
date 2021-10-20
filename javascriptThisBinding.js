
// https://thenewstack.io/mastering-javascript-callbacks-bind-apply-call/

// Javascript 'THIS'
const Obj = {
  test: 10,
  func: function() {
    console.log(this);
  }
}

Obj.func();

function Doge(saying){
  this.saying = saying;
  
  // const getThis = () =>{
  //   console.log(this);
  // }
  // getThis();
  // this.getThis = getThis;

  const getThis = function() {
    console.log(this);
  }
  const getThis2 = getThis.bind({name: 'Doge'}); 
  this.getThis = getThis2;
  // getThis();
}
const doge = new Doge("name")
doge.getThis();
