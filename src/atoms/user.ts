import { GetInformationLoginResponse } from '@src/interfaces';
import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userState',
  default: {
    usuario: {
      bvsIduse: 0,
      bvsTipodoc: '',
      bvsNodocu: '',
      bvsEmail: '',
      bvsIsEnabled: false,
      bvsNombre: '',
      bvsTelefono: '',
      bvsStatusSession: false,
      bvsIntentoSesion: false,
      bvsAcceptContract: 0,
    },
    casas: [],
    sesionActiva: {
      bvsIdsesact: 0,
      bvsIduse: 0,
      bvsActive: false,
      bvsApp: '',
      bvsFechaInicioSesion: new Date(),
      fechafinSesion: new Date(),
    },
    lastSession: {
      bvsIdsesact: 0,
      bvsIduse: false,
      bvsActive: false,
      bvsApp: '',
      bvsFechaInicioSesion: new Date(),
      fechafinSesion: new Date(),
    },
  } as GetInformationLoginResponse,
});
