import { Input, InputProps } from 'antd'
import clsx from 'clsx'
import { memo } from 'react'
import styles from './styles.module.scss'

interface InputPassword extends InputProps {
  className?: string
}
const InputFieldPassword = (props: InputPassword) => {
  const { className = '', ...rest } = props

  return (
    <Input.Password
      className={clsx(
        styles.inputFieldPassword,
        'font-14-regular',
        'font-plus-jakarta',
        {
          [className]: !!className,
        },
      )}
      {...rest}
    />
  )
}

export default memo(InputFieldPassword)
