const { useState } = require('react');

export const chain = (functions) => {
  let chained = Promise.resolve(typeof functions[0] === 'function' ? functions[0]() : functions[0]);

  for (let i = 1; i < functions.length; i++) {
    chained = chained.then(functions[i]);
  }

  return chained;
}

export class FuncArray extends Array {
  get chain() {
    return chain(this);
  }
}

export default function useMany(initialState, funcs) {
  const [state, setState] = useState(initialState);
  useEffect(async () => {
    if (funcs instanceof FuncArray) {
      const result = await funcs.chain;
      setState(result);
    } else {
      const result = await chain(funcs);
      setState(result);
    }
  });

  return state;
}
