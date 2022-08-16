import { FunctionComponent } from 'react'

type TextType = 'subtitle' | 'text' | 'small' | 'large' | 'extra-small'
type TextProps = {
  type?: TextType
  bold?: boolean
  className?: string
}

const sizes: Record<string, string> = {
  subtitle: 'text-base',
  text: 'text-sm',
  small: 'text-[13px]',
  large: 'text-lg',
  'extra-small': 'text-[11px]',
}

export const Text: FunctionComponent<TextProps> = ({
  children,
  type = 'text',
  className,
  bold = false,
}) => (
  <p
    className={`textsm ${sizes[type]} ${
      bold ? 'font-bold' : ''
    } tracking-wide ${className}`}
  >
    {children}
  </p>
)