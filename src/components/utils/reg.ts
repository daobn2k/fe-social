// eslint-disable-next-line no-useless-escape
export const REG_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const REG_PASSWORD = /^(?=.*\d)(?=.*[A-Za-z]).{6,}$/
export const REG_PHONE = /^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/
export const REG_SLUG = /^[\da-z]+(?:-[\da-z]+)*$/
export const REG_CCCD = /d{9}$|\d{12}$/
export const REG_CHARACTERS = /^(?=.*\d)(?=.*[A-Za-z])/
export const REG_IP = /^(?:\d{1,3}\.){3}\d{1,3}$/
export const REG_NUMBER = /^-?\d*(\.\d*)?$/
export const REG_LINK = /^(ftp|http|https):\/\/[^ "]+$/
export const REG_SPECIAL_CHARACTERS = /^[\d\sA-Za-zÀ-ỹ]+$/
