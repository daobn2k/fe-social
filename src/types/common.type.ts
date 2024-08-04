import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

export interface IFormProps<T extends FieldValues> {
  control?: Control<T, any>
  register?: UseFormRegister<T>
  errors?: FieldErrors<T>
}
