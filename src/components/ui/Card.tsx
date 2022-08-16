import { FunctionComponent } from 'react';

export const Card: FunctionComponent<CardProps> = ({
  children,
  withPadding = true,
}) => {
  return (
    <div
      className={`bg-neutral-0 ${withPadding ? 'p-5' : ''} rounded-lg w-full`}
    >
      {children}
    </div>
  );
};

type CardProps = {
  withPadding?: boolean;
};
