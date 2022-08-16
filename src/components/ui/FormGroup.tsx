import { FunctionComponent, ReactNode } from 'react'

export const FormGroup: FunctionComponent<FormGroupProps> = ({
  label,
  children,
  fieldName,
}) => {
  return (
    <div className="flex flex-col">
      <label className="ml-2 text-sm text-neutral-500" htmlFor={fieldName}>
        {label}
      </label>
      <div>{children}</div>
    </div>
  )
}

type FormGroupProps = {
  label?: string
  fieldName?: string
  children: ReactNode
}
