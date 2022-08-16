import { FunctionComponent } from 'react'

const Icon: FunctionComponent<IconProps> = ({ children, className = '' }) => {
  return <span className={`material-icons ${className}`}>{children}</span>
}

type IconProps = {
  className?: string
}

export default Icon
