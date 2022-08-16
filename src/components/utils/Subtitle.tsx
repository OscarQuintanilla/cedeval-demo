import { FunctionComponent } from 'react'

type SubitleProps = {
  center?: boolean
  bold?: boolean
}

const Subtitle: FunctionComponent<SubitleProps> = ({
  children,
  center = false,
  bold = false,
}) => (
  <p
    className={`text-sm text-neutral-500 mt-1 ${center ? 'text-center' : ''} ${
      bold ? 'font-bold' : ''
    }`}
  >
    {children}
  </p>
)

export default Subtitle
