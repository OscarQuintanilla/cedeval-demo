import {
  Button,
  Card,
  FormGroup,
  FormInput,
  PasswordRule,
} from '@src/components';
import { FunctionComponent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type ChangePasswordProps = {
  oldPasswordIsRequired?: boolean;
  onSubmit: SubmitHandler<any>;
};

export interface FormValues {
  old_password?: string;
  password: string;
  password_confirmation: string;
}

function verifyPasswordRule(password: string, rule: string) {}
const ChangePassword: FunctionComponent<ChangePasswordProps> = ({
  oldPasswordIsRequired = false,
  onSubmit,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      old_password: '',
      password_confirmation: '',
    },
  });

  useEffect(() => {
    if (!isValid) {
      setIsFormValid(false);
      return;
    }

    if (
      !/(^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$)/.test(
        getValues('password')
      )
    ) {
      setIsFormValid(false);
      return;
    }

    if (getValues('password') !== getValues('password_confirmation')) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
  }, [watch()]);

  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 p-3">
        <div className="text-center">
          <p className="mt-2 text-sm text-neutral-500">
            Te sugerimos crear una contraseña que proteja los datos de tu
            cuenta.
          </p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormGroup label="Nueva contraseña" fieldName="password">
                <FormInput
                  placeholder="Por favor ingresa tu contraseña"
                  type="password"
                  {...register('password', { required: true })}
                ></FormInput>
                {/* {touched.user && errors.user && <div>{t('validations')}</div>} */}
              </FormGroup>
              <div className="mt-4">
                <FormGroup label="La contraseña debe contener:">
                  <div className="grid grid-rows-4 gap-1 mt-2 ml-2">
                    <PasswordRule
                      value={watch('password')}
                      pattern={/(?=\w*[A-Z])(?=\w*[a-z])/}
                      description="Letras mayúsculas y minúsculas"
                    ></PasswordRule>
                    <PasswordRule
                      value={watch('password')}
                      pattern={/(?=\w*\d)/}
                      description="Números (0-9)"
                    ></PasswordRule>
                    <PasswordRule
                      value={watch('password')}
                      pattern={/\w{8,}/}
                      description="8 Caractéres mínimos"
                    ></PasswordRule>
                    <PasswordRule
                      value={watch('password')}
                      pattern={/(?=.*[\u0021-\u002b\u003c-\u0040])/}
                      description="Caractéres especiales"
                    ></PasswordRule>
                  </div>
                </FormGroup>
              </div>
              <FormGroup
                label="Confirmar contraseña"
                fieldName="password_confirmation"
              >
                <FormInput
                  placeholder="Por favor ingresa tu contraseña"
                  type="password"
                  {...register('password_confirmation', { required: true })}
                ></FormInput>
                {/* {touched.password && errors.password && (
                    <div>{t('validations')}</div>
                  )} */}
              </FormGroup>
              <FormGroup>
                <div className="grid mt-4">
                  <Button type="submit" style="primary" disabled={!isFormValid}>
                    Crear cuenta
                  </Button>
                </div>
              </FormGroup>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ChangePassword;
