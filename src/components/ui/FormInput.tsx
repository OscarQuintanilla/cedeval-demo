import { forwardRef, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      onBlur,
      name,
      type,
      haserror,
      placeholder,
      disabled,
      centered = false,
      maxLength,
    },
    ref
  ) => {
    const [actualInputType, setActualInputType] = useState(type);
    const isPasswordField = type === 'password';

    const toggleVisibility = () => {
      setActualInputType(actualInputType === 'password' ? 'text' : 'password');
    };

    return (
      <div className="flex items-center justify-end">
        <input
          maxLength={maxLength}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          type={actualInputType}
          className={`p-3 border rounded-lg w-full ${
            centered ? 'text-center' : ''
          }  ${haserror ? 'border-semantic-error' : 'border-neutral-600'}`}
          placeholder={placeholder}
          disabled={disabled}
        ></input>
        {isPasswordField ? (
          <span
            className="absolute mr-4 cursor-pointer material-icons text-neutral-500"
            onClick={() => toggleVisibility()}
          >
            {actualInputType === 'password' ? 'visibility_off' : 'visibility'}
          </span>
        ) : null}
      </div>
    );
  }
);

type InputProps = ReturnType<UseFormRegister<any>> & {
  haserror?: Boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  centered?: boolean;
  mask?: string;
  masked?: boolean;
};
