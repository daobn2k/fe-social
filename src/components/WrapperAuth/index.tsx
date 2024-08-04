import React from 'react'
import styles from './styles.module.scss'

export default function WrapperAuth({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={styles.rootWrap}>
      <div className={styles.wrap}>
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
