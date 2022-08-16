import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

type Option = {
  label: string;
  value: any;
};

type InputProps = {
  hasError?: boolean;
  options: Option[];
};

export const FormSelect = (props: InputProps & UseControllerProps<any>) => {
  const {
    field: { onChange },
  } = useController(props);

  const [selected, setSelected] = useState(props.options[-1]);

  function handleSelected(option: Option) {
    setSelected(option);
    onChange(option.value);
  }
  
  return (
    <Listbox value={selected} onChange={handleSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full p-3 pr-10 text-left bg-white border rounded-lg cursor-pointer border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span
            className={`block truncate ${
              !selected ? 'text-neutral-600' : null
            }`}
          >
            {selected ? selected.label : 'Selecciona una opción'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <span className="w-5 h-5 mr-2 material-icons text-neutral-500">
              expand_more
            </span>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full mt-1 overflow-auto text-base bg-white rounded-md drop-shadow-lg max-h-60 focus:outline-none sm:text-sm">
            {props.options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ selected, active }) =>
                  `group hover:bg-secondary-900 hover:text-secondary-500 cursor-pointer select-none relative pl-10 pt-3 pb-3 pr-3
                    ${selected ? 'bg-secondary-800 text-neutral-0' : ''}
                          `
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        active ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-icons text-neutral-0 group-hover:text-secondary-500">
                          done
                        </span>
                        {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
