import { FunctionComponent } from 'react';

type TitleType = 'h1' | 'h2' | 'h3' | 'sub1' | 'sub2';
type TitleProps = {
  type?: TitleType;
  className?: string;
};

const sizes: Record<string, string> = {
  sub1: 'text-lg',
};

export const Title: FunctionComponent<TitleProps> = ({
  children,
  type = 'h1',
  className = '',
}) => (
  <p
    className={`text-primary text-lg ${sizes[type]} font-bold tracking-wide ${className}`}
  >
    {children}
  </p>
);
