import { useState } from 'react';

export const useAccount = () => {
  const [account, setAccount] = useState<any>({});

  const setAccountValue = (value: any) => {
    setAccount(value);
  };
  return { account, setAccountValue };
};
