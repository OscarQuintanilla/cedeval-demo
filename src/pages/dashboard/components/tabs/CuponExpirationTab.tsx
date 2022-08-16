import { accountAtom } from '@src/atoms/account';
import { Card, FormGroup, FormInput, Modal, Text } from '@src/components';
import { EmptyState } from '@src/components/ui/EmptyState';
import { axios, currency, dayjs } from '@src/libs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import SearchBar from './components/SearchBar';

interface FormValues {
  search: string;
}

const CuponExpirationTab: FC = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const search = watch('search');

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [couponsAccount, setCouponsAccount] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [currentCoupon, setCurrentCoupon] = useState<any>({});
  const [account, setAccount] = useRecoilState(accountAtom);
  const [isEmpty, setIsEmpty] = useState(true);
  const [paginator, setpaginator] = useState<any>({});

  const fetchCuponsAccount = async (page?: number) => {
    axios
      .post('/vbesRest/getCouponsAccoun', {
        request: {
          msg: {
            cte: account.cte,
            cta: account.cta,
          },
        },
      })
      .then((res) => {
        if (
          res.data?.response?.errorCode !== '0' ||
          res.data.response.msg.cupones.length === 0
        ) {
          setIsEmpty(true);
          setCouponsAccount([]);
        } else {
          setIsEmpty(false);
          setCouponsAccount(res.data.response.msg.cupones);
          // setpaginator({
          //   totalPages: res.data.response.msg.cupones.totalPages,
          //   currentPage: res.data.response.msg.cupones.number,
          //   totalElements: res.data.response.msg.cupones.totalElements,
          // });
        }
      });
  };

  useEffect(() => {
    if (account.cta === '') return;
    fetchCuponsAccount();
  }, [account]);

  useEffect(() => {
    const filtered = couponsAccount.filter((transaction) => {
      return (
        transaction.emisionCodigo
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.emisor.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredTransactions(filtered);
  }, [search, couponsAccount]);

  const nextPage = () => {
    if (paginator.currentPage + 1 === paginator.totalPages) return;
    fetchCuponsAccount(paginator.currentPage + 1);
  };
  return (
    <Card>
      <Modal
        withPadding={false}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Card withPadding={false}>
          <div className="flex flex-col ">
            <div className="px-6 py-4 bg-neutral-500">
              <Text type="subtitle" className="text-neutral-0">
                Detalle de consulta
              </Text>
            </div>

            <div className="grid grid-cols-2 px-6 py-4 bg-neutral-700">
              <div>
                <Text type="extra-small" className="text-neutral-500">
                  Monto de anotación
                </Text>
                <Text type="large" className="text-secondary-500" bold>
                  {currency(currentCoupon.valor).format()}
                </Text>
              </div>
              <div>
                <Text type="extra-small" className="text-neutral-500">
                  Valor
                </Text>
                <Text type="large" className="text-semantic-success" bold>
                  {currency(currentCoupon.valor).format()}
                </Text>
              </div>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="px-6 py-4">
                <Text type="small">Emisor</Text>
                <Text type="small" bold>
                  {currentCoupon.emisor}
                </Text>
              </div>
              <div className="px-6 py-4">
                <Text type="small">Serie</Text>
                <Text type="small" bold>
                  {currentCoupon.emisionSerie}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Emisión</Text>
                <Text type="small" bold>
                  {currentCoupon.emisionCodigo}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Moneda</Text>
                <Text type="small" bold>
                  {currentCoupon.nomMoneda}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Detalle</Text>
                <Text type="small" bold>
                  {currentCoupon.claseCupon === 'A'
                    ? 'VALOR AMORTIZABLE'
                    : 'VALOR INTERESES'}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Fecha de pago</Text>
                <Text type="small" bold>
                  {dayjs(currentCoupon.fechaPago).format('DD [de] MMMM YYYY')}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Modal>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2">
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-neutral-500">
                Consulta:
              </span>
              <span className="text-xs ">
                {dayjs().format('DD [de] MMMM YYYY')} al{' '}
                {dayjs(
                  couponsAccount[couponsAccount.length - 1]?.fechaPago
                ).format('DD [de] MMMM YYYY')}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-bold text-neutral-500">
              Resultados:{' '}
            </span>
            <span className="text-sm text-neutral-500">
              {couponsAccount.length ?? 0} registros
            </span>
          </div>
        </div>

        <div className="relative ">
          <div className="z-50">
            <FormGroup>
              <SearchBar placeholder="Buscar cuenta" {...register('search')} />
            </FormGroup>
          </div>
          {/* <div className="absolute top-0 z-10 flex items-center justify-start w-full h-full">
          <span className="mt-1 ml-2 material-icons top-4">search</span>
        </div> */}
        </div>

        <div className="flex flex-col divide-y">
          {isEmpty && (
            <div className="flex justify-center w-full">
              <EmptyState />
            </div>
          )}

          {!isEmpty &&
            filteredTransactions.map((coupon, index) => (
              <div
                className="grid grid-cols-2 p-3 cursor-pointer hover:bg-neutral-100"
                key={index}
                onClick={() => {
                  setIsOpenModal(true);
                  setCurrentCoupon(coupon);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-sm text-neutral-600">#{coupon.emisor}</p>
                  <p className="text-base text-neutral-500">
                    {coupon.emisionCodigo}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-neutral-600">
                      Monto de anotación
                    </p>
                    <p className="text-lg font-bold text-secondary-500">
                      {currency(coupon.valor).format()}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="flex">
                      <div className="flex items-center justify-center">
                        <span className="w-5 h-5 material-icons text-neutral-500">
                          chevron_right
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}

          <div className="flex items-center justify-center gap-4 pt-6">
            {Array(paginator?.totalPages)
              .fill(0)
              .map((item, index) => (
                <button
                  onClick={() => fetchCuponsAccount(index)}
                  className={`text-base  text-neutral-500 hover:text-secondary-500 ${
                    index === paginator?.currentPage
                      ? 'text-secondary-500 font-bold'
                      : ''
                  }`}
                  key={index}
                >
                  <span>{index + 1}</span>
                </button>
              ))}
            <div className="flex items-center justify-center mb-1">
              <button
                onClick={() => nextPage()}
                className="flex text-base font-bold text-neutral-500 hover:text-secondary-500 "
              >
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 material-icons text-neutral-500">
                    chevron_right
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CuponExpirationTab;
