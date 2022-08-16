import { Account } from './../interfaces/Account';
import { atom } from 'recoil';

export const accountAtom = atom({
  key: 'accountAtom',
  default: {
    cta: '',
    cte: '',
    estado: '',
    tcta: '',
    tmvCodcas: '',
    tmvNomcor: '',
  } as Account,
});
