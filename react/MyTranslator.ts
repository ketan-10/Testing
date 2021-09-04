// usecase -> const { t : t1, change } = useMyTanslator();
// just by adding this hook, component will re-render if any component call change.

import { useState, useEffect} from "react";

const hooks : Array<Function> = []

const change = (newLang: string) => {
  hooks.forEach(h => h(newLang));
}


interface LanguageValue {
  [key: string]: {
    [key: string]: string
  }
}

const value = {
  en: {
    hello: "hello",
    dark: "Dark"
  },
  hi: {
    hello: "हेलो",
    dark: "डार्क"
  },
} as LanguageValue;

// another way to store small data without `useContext` is localStorage
// https://stackoverflow.com/questions/31352261/how-to-keep-react-component-state-between-mount-unmount
// but it wont cause re-render, you can use 'useLocalStorage' from 'react-use' to force render on local-storage change


export const useMyTanslator = () => {

  const [lang, setLang] = useState<string>("en");

  const t = (v: string) : string =>  {
    return value[lang][v]
  }

  useEffect(() => {

    function changeLang (newLang: string) {
      setLang(newLang);
    }

    hooks.push(changeLang)
    return () => {
      hooks.forEach((ele,idx) => ele === changeLang ? hooks.splice(idx,1) : null);
    }
  }, [])


  return {
    t,
    change
  }
  
}
