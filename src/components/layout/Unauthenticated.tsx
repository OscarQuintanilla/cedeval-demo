import { Logo } from '@components';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Unauthenticated: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="overflow-hidden bg-neutral-0">
        <div className="container grid grid-cols-5 mx-auto lg:grid-cols-2">
          <div className="grid text-primary lg:grid-cols-4">
            <div className="flex items-center justify-center p-2">
              <Logo></Logo>
            </div>
          </div>
          <div className="flex justify-end col-span-4 lg:gap-6 lg:col-span-1">
            <a
              rel="noopener noreferrer"
              href="https://www.cedeval.com/preguntas-frecuentes/"
              target="_blank"
              className="flex items-center justify-center p-4 hover:bg-neutral-100"
            >
              <span className="text-sm font-bold text-neutral-500">
                Preguntas frecuentes
              </span>
            </a>
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

              <a href='/terms'>
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
