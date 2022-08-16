/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { userAtom } from '@src/atoms/user';

type Props = {
  logout: () => void;
};

export const UserAvatar = ({ logout }: Props) => {
  const [user] = useRecoilState(userAtom);

  const nameInitials = user?.usuario.bvsNombre
    .split(' ')
    .splice(0, 2)
    .map((name) => name[0]?.toUpperCase());

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full">
            <span className="font-medium leading-none text-white">
              {nameInitials}
            </span>
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm ">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.usuario.bvsEmail}
            </p>
          </div>
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    type="button"
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cerrar sesión
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
