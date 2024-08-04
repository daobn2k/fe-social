import { Input, InputProps } from 'antd'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { memo } from 'react'

interface IInputField extends InputProps {
  className?: string
}

const InputTextField = (props: IInputField) => {
  const { className = '', ...rest } = props

  return (
    <>
      <Input
        className={clsx(
          styles.inputField,
          'font-14-regular',
          'font-plus-jakarta',
          {
            [className]: !!className,
          },
        )}
        {...rest}
      />
    </>
  )
}

export default memo(InputTextField)
