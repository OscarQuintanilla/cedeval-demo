import { FunctionComponent, useEffect, useState } from 'react';

type PasswordRuleProps = {
  pattern: RegExp;
  value: any;
  description: string;
};
export const PasswordRule: FunctionComponent<PasswordRuleProps> = ({
  value,
  pattern,
  description,
}) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(pattern.test(value));
  }, [value]);

  return (
    <div className="flex items-center h-6 text-sm text-neutral-500">
      {isValid ? (
        <span className="text-2xl leading-none transition-all ease-in delay-200 material-icons text-secondary-500">
          check_circle
        </span>
      ) : (
        <span className="text-xl leading-none transition-all ease-in delay-200 material-icons">
          radio_button_unchecked
        </span>
      )}

      <span>{description}</span>
    </div>
  );
};
