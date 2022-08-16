import { FC, ReactNode } from 'react';

export const Button: FC<ButtonProps> = ({
  style = 'primary',
  disabled = false,
  children,
  type = 'button',
  onClick,
}) => {
  return (
    <>
      <button
        className={`flex items-center justify-center gap-1 py-4 px-8 rounded-lg text-sm font-bold font-open-sans tracking-wider ${getButtonStyles(
          style,
          disabled
        )}`}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

function getButtonStyles(style: Style, disabled: boolean) {
  const styles = {
    primary:
      'text-neutral-0 bg-secondary-500 hover:bg-secondary-700 active:bg-secondary-900',
    secondary:
      'border text-secondary-500 bg-neutral-0 border-secondary-500 hover:bg-secondary-800 active:bg-secondary-900 active:text-secondary-700 active:border-secondary-700',
    tertiary:
      'border text-neutral-500 bg-neutral-0 border-neutral-700 hover:bg-neutral-700 active:bg-neutral-600 active:text-neutral-500 active:border-neutral-600',
  };

  const disabledStyles = {
    primary: 'bg-neutral-700 text-neutral-600',
    secondary: 'border bg-neutral-0 border-neutral-600 text-neutral-700',
    tertiary: 'bg-neutral-0 text-neutral-600',
  };

  if (disabled) {
    return disabledStyles[style];
  }

  return styles[style];
}

type Style = 'primary' | 'secondary' | 'tertiary';
type ButtonType = 'button' | 'submit';
type ButtonProps = {
  style?: Style;
  disabled?: boolean;
  children: ReactNode;
  type?: ButtonType;
  onClick?: any;
};
