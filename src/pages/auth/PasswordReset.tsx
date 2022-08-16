import { Unauthenticated } from '@src/components';
import ChangePassword, { FormValues } from '@src/components/PasswordReset';
import Notification from '@src/components/ui/Notification';
import { useAuth } from '@src/hooks';
import { FunctionComponent, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const SetPassword: FunctionComponent<{}> = () => {
  const [search, setSearch] = useSearchParams();
  const [showNotification, setShowNotification] = useState(false);

  const [error, setError] = useState('');
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const { resetPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
    setError,
  });

  useEffect(() => {
    if (error !== '') {
      setShowNotification(true);
    }
  }, [error]);

  const formSubmit: SubmitHandler<FormValues> = (data) => {
    resetPassword({
      email: search.get('email') ?? '',
      password: data.password,
      setStatus,
      token: search.get('token') ?? '',
    });
  };
  
  const handleOnClose = () => {
    setError('');
    setShowNotification(false);
  };

  return (
    <Unauthenticated>
      <Notification
        title="Se ha cambiado tu contraseña"
        message="Serás redirigido al login en unos segundos..."
        type="success"
        open={status}
        onClose={() => {
          setStatus(false);
          navigate('/login');
        }}
      ></Notification>
      <Notification
        message={error}
        title="Ha ocurrido un error"
        type="error"
        open={showNotification}
        onClose={() => handleOnClose()}
      />
      <div className="container flex items-center justify-center flex-1 mx-auto">
        <div className="my-6 mx-4 sm:w-[409px]">
          <ChangePassword onSubmit={formSubmit}></ChangePassword>
        </div>
      </div>
    </Unauthenticated>
  );
};

export default SetPassword;
