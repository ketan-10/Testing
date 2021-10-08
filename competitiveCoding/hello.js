
let answer = 0;
const calculate = (total) => {
  if(total <= 0) {
    if (total == 0) answer++; return; 
  }
  calculate(total-1);
  calculate(total-2);
}

calculate(5);
console.log(answer);