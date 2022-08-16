import {
  Button,
  Card,
  FormGroup,
  FormInput,
  FormSelect,
  Title,
  Unauthenticated,
} from '@src/components';
import Notification from '@src/components/ui/Notification';
import Subtitle from '@src/components/utils/Subtitle';
import { useAuth } from '@src/hooks';
import { RegisterForm } from '@src/interfaces';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input-rc-17';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface FormValues {
  code: String;
}

export default function AcceptTermsPage({ onlyView = false }) {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [terms, setTerms] = useState<any>({});
  const [showNotification, setShowNotification] = useState(false);

  const [error, setError] = useState('');
  const [state, setState] = useState({
    code: '',
  });

  const { getTerms, acceptTerms } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
    setError,
  });

  const handleAcceptTerms = async () => {
    acceptTerms(
      [terms.response.msg.contrato.bvsIdcontratos],
      search.get('p_key') ?? ''
    )
      .then(({ data }) => {
        if (data.response.errorCode === '0') {
          navigate('/verify-user');
        } else {
          setError(data.response.errorMessage);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const fetchTerms = async () => {
      const { data } = await getTerms();
      setTerms(data);
    };
    fetchTerms();

    console.log(terms);
  }, []);

  useEffect(() => {
    if (error !== '') {
      setShowNotification(true);
    }
  }, [error]);

  const handleOnClose = () => {
    setError('');
    setShowNotification(false);
  };

  return (
    <Unauthenticated>
      <Notification
        message={error}
        title="Ha ocurrido un error"
        type="error"
        open={showNotification}
        onClose={() => handleOnClose()}
      />
      <div className="container flex justify-center flex-1 mx-auto mt-10">
        <div className="container">
          <Card>
            <div
              className="flex flex-col gap-4 p-2"
              dangerouslySetInnerHTML={{
                __html: terms?.response?.msg.contrato.bvsContrato,
              }}
            />

            {!onlyView && (
              <div className="flex justify-center mt-4">
                <Button onClick={handleAcceptTerms}>Aceptar</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Unauthenticated>
  );
}
