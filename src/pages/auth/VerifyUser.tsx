import {
  Button,
  Card,
  FormGroup,
  FormInput,
  FormSelect,
  Unauthenticated,
} from '@src/components';
import Notification from '@src/components/ui/Notification';
import { useAuth } from '@src/hooks';
import { RegisterForm } from '@src/interfaces';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: 'DUI', value: 'DUI' },
  { label: 'NIT', value: 'NIT' },
  { label: 'Pasaporte', value: 'PASS' },
];

export default function VerifyUserPage() {
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const { forgotPasswordValidateUser } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
    setError,
  });

  useEffect(() => {
    if (error !== '') {
      setShowNotification(true);
    }
  }, [error]);

  const handleOnClose = () => {
    setError('');
    setShowNotification(false);
  };

  const {
    handleSubmit,
    control,
    register,
    getFieldState,
    getValues,
    formState: { isValid },
  } = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: {
      document_type: '',
      document_value: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    forgotPasswordValidateUser(data);
  };
  const documentTypeState = getFieldState('document_type');
  const emailState = getFieldState('email');

  return (
    <Unauthenticated>
      <Notification
        message={error}
        title="Ha ocurrido un error"
        type="error"
        open={showNotification}
        onClose={() => handleOnClose()}
      />
      <div className="container flex items-center justify-center flex-1 mx-auto">
        <div className="my-6 mx-4 sm:w-[409px]">
          <Card>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-center p-2">
                <div className="">
                  <h3 className="text-center">
                    Recuperar contraseña o recuperar usuario
                  </h3>
                  <p className="text-center text-neutral-500">
                    Para restablecer alguna de estas altenativas debemos validar
                    tu cuenta.
                  </p>
                  <p className="mt-2 text-center text-neutral-500">
                    Por favor, ingresa los siguientes datos:
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  {/* Document type field */}
                  <FormGroup
                    label="Tipo de documento de identificación"
                    fieldName="document_type"
                  >
                    <FormSelect
                      options={options}
                      control={control}
                      name="document_type"
                      rules={{ required: true }}
                    ></FormSelect>
                    {/* <ErrorBag>
                          <p>
                            {errors.document_type &&
                              t('required', { ns: 'validations' })}
                          </p>
                        </ErrorBag> */}
                  </FormGroup>
                  {/* Document Number Field */}
                  <FormGroup
                    label="Número de documento"
                    fieldName="document_number"
                  >
                    <FormInput
                      haserror={documentTypeState.invalid}
                      placeholder="00000000-0"
                      {...register('document_value', { required: true })}
                    ></FormInput>
                    {/* <ErrorBag>
                          <p>
                            {errors.document_value &&
                              t('required', { ns: 'validations' })}
                          </p>
                        </ErrorBag> */}
                  </FormGroup>
                  {/* Email Field */}
                  <FormGroup
                    label="Correo electrónico de contacto"
                    fieldName="email"
                  >
                    <FormInput
                      haserror={emailState.invalid}
                      placeholder="ej. name@container.com"
                      {...register('email', { required: true })}
                    ></FormInput>
                    {/* <ErrorBag>
                          <p>
                            {errors.email && t('required', { ns: 'validations' })}
                          </p>
                        </ErrorBag> */}
                  </FormGroup>
                  {/* Submit button */}
                  <FormGroup>
                    <div className="grid mt-4">
                      <Button type="submit" style="primary" disabled={!isValid}>
                        Solicitar cambio de contraseña
                      </Button>
                    </div>
                  </FormGroup>
                </div>
              </form>
              <div className="flex flex-col gap-6 m-2">
                <div className="text-center">
                  <Link to="/login">
                    <span className="cursor-pointer text-secondary-500">
                      Ya tengo cuenta
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Unauthenticated>
  );
}
