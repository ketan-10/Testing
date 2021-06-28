function getBytes(){
  return (input:string) => {
    return [input]
  };
}

function getString(){
  return (input:string) => {
    return "string"
  };
}

function getObject<T>(request: string,responseTransform: (input: string) => T):T{
  return responseTransform(request);
}

const response = getObject("",getBytes())

export {}
