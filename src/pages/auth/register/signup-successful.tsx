import { Button, Card, Unauthenticated } from '@src/components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupSuccessful: FC = () => {
  const navigate = useNavigate();

  return (
    <Unauthenticated>
      <div className="container flex items-center justify-center flex-1 mx-auto">
        <div className="my-6 mx-4 sm:w-[418px]">
          <Card>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col items-center justify-center gap-3 p-4 text-sm">
                <div className="">
                  <h3 className="text-center">¡Envío exitoso!</h3>
                  <p className="text-center text-neutral-500">
                    Hemos recibido tu solicitud de registro, estaremos dando
                    seguimiento a tu caso en las próximas 48 horas, una vez
                    aprobado enviaremos tus credenciales al correo asociado a tu
                    cuenta.
                  </p>
                </div>
                <p className="text-center text-neutral-500">
                  Cualquier duda puedes escribirnos a
                  <br />
                  <a href="mailto:consulta@cedeval.com">
                    <span className="font-bold tracking-wide">
                      consulta@cedeval.com
                    </span>
                  </a>
                </p>
              </div>

              <Button onClick={() => navigate('/login')}>
                Regresar al login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Unauthenticated>
  );
};

export default SignupSuccessful;
