import {
  Button,
  Card,
  FormGroup,
  FormInput,
  FormSelect,
  Title,
  Unauthenticated,
} from '@src/components';
import Subtitle from '@src/components/utils/Subtitle';
import { useAuth } from '@src/hooks';
import { RegisterForm } from '@src/interfaces';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input-rc-17';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface FormValues {
  code: String;
}

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();

  const [error, setError] = useState('');
  const [state, setState] = useState({
    code: '',
  });

  const { forgotPasswordValidateUser } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
    setError,
  });
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { code: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    navigate(
      '/password-reset?token=' + state.code + '&email=' + search.get('email')
    );
  };

  return (
    <Unauthenticated>
      <div className="container flex justify-center flex-1 mx-auto mt-10">
        <div className="w-[450px]">
          <Card>
            <div className="flex flex-col gap-4 p-2">
              <div className="flex flex-col items-center justify-center">
                <Title>Recuperar contraseña</Title>
                <Subtitle center>
                  Por favor ingresa el código de seguridad de 6 carácteres
                  enviado a tu correo
                </Subtitle>
                <div className="my-3">
                  <Subtitle bold>{search.get('email')}</Subtitle>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <OtpInput
                    disabledStyle={true}
                    containerStyle={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    inputStyle={{ width: '3rem', margin: '0 0.5rem' }}
                    value={state.code}
                    onChange={(code: any) => setState({ code })}
                    numInputs={6}
                    separator={<span>-</span>}
                  />
                  <Button type="submit" disabled={state.code.length !== 6}>
                    Verificar
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </Unauthenticated>
  );
}
