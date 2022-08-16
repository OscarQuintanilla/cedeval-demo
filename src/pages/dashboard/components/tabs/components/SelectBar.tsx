/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';

type Option = {
  label: string;
  value: any;
};

type InputProps = {
  hasError?: boolean;
  options: Option[];
};

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SelectBar(props: InputProps & UseControllerProps<any>) {
  const {
    field: { onChange },
  } = useController(props);

  const [selected, setSelected] = useState(props.options[0]);

  function handleSelected(option: Option) {
    setSelected(option);
    onChange(option.value);
  }

  return (
    <Listbox value={selected} onChange={handleSelected} refName="">
      {({ open }) => (
        <div className="relative ">
          <Listbox.Button className="relative w-full p-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span
              className={`block truncate ${
                !selected ? 'text-neutral-600' : null
              }`}
            >
              {selected ? selected.label : 'Selecciona una opción'}
            </span>{' '}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.options.map((person) => (
                <Listbox.Option
                  key={person.value}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-secondary-700' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {person.label}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-secondary-500',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
