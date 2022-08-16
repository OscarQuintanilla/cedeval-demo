import { FunctionComponent } from 'react'

const ErrorBag: FunctionComponent<ErrorBagProps> = ({ children }) => {
  return (
    <div className="text-semantic-error flex flex-col text-xs pt-1">{children}</div>
  )
}

type ErrorBagProps = {}

export default ErrorBag
