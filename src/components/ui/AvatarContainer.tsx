import { FC } from 'react';

export const AvatarContainer: FC<AvatarContainerProps> = ({
  children,
  size = 'md',
  type = 'text',
  value,
}) => {
  return (
    <div
      className={`rounded-full overflow-hidden ${sizes[size]} flex items-center justify-center bg-[#4CA8FF] text-white`}
    >
      {type === 'img' ? (
        <img className={`${sizes[size]}`} src={value} alt="Profile img" />
      ) : (
        <span className=" text-xl">{value}</span>
      )}
    </div>
  );
};

type AvatarContainerProps = {
  size?: Size;
  type?: AvatarType;
  value: string;
};

type Size = 'sm' | 'md' | 'lg' | 'xl';

type AvatarType = 'img' | 'text';
const sizes: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-20 h-20',
};
