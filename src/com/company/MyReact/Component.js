import { useState } from './MyReact.js'


export default function Component({propCount}) {

  const [count, setCount] = useState(0);
  const propCountDoubled = 0;


  setTimeout(()=> {
    setCount(count + 1);
  }, 1000)

  return `
    State: ${count}
    Prop: ${propCount}
    Prop Doubled: ${propCountDoubled}
  `
}