import { FC, useEffect, useState } from 'react';
import { LogoWhite, AvatarContainer } from '@components';
import { Link } from 'react-router-dom';
import { useAuth } from '@src/hooks';
import { UserAvatar } from '../ui/UserAvatar';
import { useIdleTimer } from 'react-idle-timer';


export const Authenticated: FC = ({ children }) => {
  const { isIdle } = useIdleTimer({
    onIdle: () => _handleIdle(),
    timeout: 90000,
  });

  const [error, setError] = useState('');
  const { user, signOut } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: 'dashboard',
    setError,
  });

  useEffect(() => {}, [isIdle]);

  const _handleIdle = () => {
    signOut();
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className=" bg-primary">
        <div className="container grid grid-cols-2 mx-auto">
          {/* Logo */}
          <div className="grid grid-cols-5 text-primary">
            <div className="flex items-center justify-center p-2">
              <LogoWhite></LogoWhite>
            </div>
          </div>

          {/*  */}
          <div className="flex items-center justify-end gap-6">
            <button>
              <span className="text-2xl font-thin material-icons text-neutral-0">
                help_outline
              </span>
            </button>
            <UserAvatar logout={signOut}></UserAvatar>
            {/* <AvatarContainer
              type="text"
              value={user?.usuario.bvsNombre[0].toUpperCase() || ''}
            ></AvatarContainer> */}
            {/* <HeaderLink link="#" label={t('house_brokers')}></HeaderLink> */}
          </div>
        </div>
      </header>
      {children}
      <footer className="bg-[#919BB3] text-neutral-0">
        <div className="flex flex-col gap-4 px-32 py-10 ">
          <p className="text-xs tracking-wide text-center">
            <b>Términos de uso:</b> La información contenido en este sitio es
            propiedad de Central de Depósito de Valores S.A de C.V o de las
            fuentes citas en casos que apliquen, cuyos caso la Central de
            Depósito de Valores S.A de C.V no se responsabiliza por la presión,
            oportunidad o exhatividad de la misma. Cualquier reporte
            electrónicoo impresos obtenido por este medio no constituye una
            certificación, si surte efecto legal.
          </p>
          <hr className="border-[#AAAEB8]" />
          <div className="grid grid-cols-2 gap-10">
            <div className="flex justify-around gap-4 text-sm font-bold tracking-wide">
              <a
                rel="noopener noreferrer"
                href="https://www.cedeval.com/contacto/"
                target="_blank"
              >
                <span>Contacto</span>
              </a>

              <a href="/terms">
                <span>Contratos de confidencialidad</span>
              </a>
            </div>
            <div>
              <p className="text-xs tracking-wide text-center">
                Todos los derechos reservados, Central de Depósito de Valores de
                El Salvador 2021®
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
