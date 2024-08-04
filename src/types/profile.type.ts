export interface Setting {
  lang: string
}

export interface AdditionInfo {
  companyDescription?: string
  companyName: string
  productDescription?: string
  productName?: string
  targetCustomer?: string
}

export interface Subscription {
  packageName: string
  startAt: string
  expiredAt: string | null
}

export interface Profile {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  favoritePromptIds: string[]
  createdAt: string
  updatedAt: string
  __v: number
  setting: Setting
  additionInfo: AdditionInfo
  subscription: Subscription
  updatedPasswordAt?: string
  avatar: string
}
