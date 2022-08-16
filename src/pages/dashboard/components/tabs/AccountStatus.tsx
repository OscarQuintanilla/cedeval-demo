import { accountAtom } from '@src/atoms/account';
import {
  Card,
  FormGroup,
  FormInput,
  FormSelect,
  Modal,
  Text,
} from '@src/components';
import { EmptyState } from '@src/components/ui/EmptyState';
import AccountContext from '@src/context/AccountContext';
import { useAccount } from '@src/hooks/account';
import { axios, currency, dayjs } from '@src/libs';
import { FC, FunctionComponent, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import SearchBar from './components/SearchBar';
import SelectBar from './components/SelectBar';

interface FormValues {
  month: Number;
  search: String;
}
const AccountStatusTab: FC = () => {
  const { register, handleSubmit, control, watch } = useForm<FormValues>();
  const month = watch('month');
  const search = watch('search');

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [currentTransaction, setCurrentTransaction] = useState<any>({});
  const [isEmpty, setIsEmpty] = useState(true);
  const [account, setAccount] = useRecoilState(accountAtom);
  const [paginator, setpaginator] = useState<any>({});

  const fetchAccountSummary = async (page?: number) => {
    axios
      .post(`/vbesRest/getAccountSummary?page=${page ?? 0}`, {
        request: {
          msg: {
            cte: account.cte,
            cta: account.cta,
            tcta: account.tcta,
            mes: month ?? 0,
          },
        },
      })
      .then((res) => {
        if (
          res.data?.response?.errorCode !== '0' ||
          res.data.response.msg.cuentas.content.lenght === 0
        ) {
          setTransactions([]);
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setTransactions(res.data.response.msg.cuentas.content);
          setpaginator({
            totalPages: res.data.response.msg.cuentas.totalPages,
            currentPage: res.data.response.msg.cuentas.number,
            totalElements: res.data.response.msg.cuentas.totalElements,
          });
        }
      });
  };

  useEffect(() => {
    if (account.cta === '') return;
    fetchAccountSummary();
  }, [account, month]);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      return transaction.emision?.toLowerCase().includes(search?.toLowerCase()) || transaction.emisor?.toLowerCase().includes(search?.toLowerCase());
    });

    setFilteredTransactions(filtered);
  }, [search, transactions]);

  const nextPage = () => {
    if (paginator.currentPage + 1 === paginator.totalPages) return;
    fetchAccountSummary(paginator.currentPage + 1);
  };

  const months = [
    { value: 0, label: dayjs().format('MMMM YYYY') },
    { value: 1, label: dayjs().subtract(1, 'month').format('MMMM YYYY') },
    { value: 2, label: dayjs().subtract(2, 'month').format('MMMM YYYY') },
  ];

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
                Detalle de estado
              </Text>
            </div>

            <div
              className={`px-6 py-4 text-neutral-0 ${
                currentTransaction.operacion === 'Deposito'
                  ? 'bg-semantic-success'
                  : 'bg-semantic-error'
              }`}
            >
              <div>
                <Text type="small">
                  {currentTransaction.operacion === 'Deposito'
                    ? 'Depósito'
                    : 'Retiro'}
                </Text>
                <Text type="large" bold>
                  {currency(currentTransaction.vFacial).format()}
                </Text>
              </div>
            </div>

            <div className="flex flex-col divide-y text-neutral-500 place-content-center">
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Emisión</Text>
                <Text type="small" bold>
                  {currentTransaction.emision}
                </Text>
              </div>
              <div className="px-6 py-4">
                <Text type="small">Título</Text>
                <Text type="small" bold>
                  {currentTransaction.titulo}
                </Text>
              </div>
              <div className="px-6 py-4 ">
                <Text type="small">Emisor</Text>
                <Text type="small" bold>
                  {currentTransaction.emisor}
                </Text>
              </div>
              <div className="px-6 py-4 ">
                <Text type="small">Descripción de administración</Text>
                <Text type="small" bold>
                  {currentTransaction.descripcionOp}
                </Text>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Text type="small">Fecha de vencimiento</Text>
                <Text type="small" bold>
                  {currentTransaction.fvencimiento
                    ? dayjs(currentTransaction.fvencimiento).format(
                        'DD [de] MMMM YYYY'
                      )
                    : 'N/A'}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Modal>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2">
          <div className="flex gap-2">
            <div className="flex items-center">
              <span className="text-[13px] font-bold text-neutral-500">
                Consulta desde:
              </span>
            </div>
            <SelectBar
              options={months}
              control={control}
              name="month"
              rules={{ required: true }}
            ></SelectBar>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-bold text-neutral-500">
              Resultados:{' '}
            </span>
            <span className="text-sm text-neutral-500">
              {paginator.totalElements ?? 0} registros
            </span>
          </div>
        </div>

        <div className="relative ">
          <div className="z-50">
            <FormGroup>
              <SearchBar placeholder="Buscar cuenta" {...register('search')} />
              {/* <FormInput {...register('search')}></FormInput> */}
            </FormGroup>
          </div>
        </div>

        <div className="flex flex-col divide-y">
          {isEmpty && (
            <div className="flex justify-center w-full">
              <EmptyState />
            </div>
          )}
          {!isEmpty &&
            filteredTransactions.map((transaction) => (
              <div
                className="grid grid-cols-3 p-3 cursor-pointer hover:bg-neutral-100"
                key={`${transaction.titulo}-${transaction.folio}`}
                onClick={() => {
                  setCurrentTransaction(transaction);
                  setIsOpenModal(true);
                }}
              >
                <div className="flex gap-6">
                  <div className="flex items-center justify-center mb-1">
                    {transaction.operacion === 'Deposito' ? (
                      <span className="w-5 h-5 material-icons text-semantic-success">
                        north_east
                      </span>
                    ) : (
                      <span className="w-5 h-5 material-icons text-semantic-error">
                        south_west
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-base text-neutral-500">
                      {transaction.operacion === 'Deposito'
                        ? 'Depósito'
                        : 'Retiro'}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {dayjs(transaction.fecha).format('DD [de] MMMM YYYY')}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end col-start-3 gap-10">
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-neutral-600">Valor nominal</p>
                    <p
                      className={`text-lg font-bold ${
                        transaction.operacion === 'Deposito'
                          ? 'text-semantic-success'
                          : 'text-semantic-error'
                      }`}
                    >
                      {currency(transaction.vFacial).format()}
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
                  onClick={() => fetchAccountSummary(index)}
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

export default AccountStatusTab;
