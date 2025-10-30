import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber"

const phoneUtil = PhoneNumberUtil.getInstance()

export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch {
    return false
  }
}

export const formatPhoneNumber = (phone: string) => {
  if (phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))) {
    return phoneUtil.format(phoneUtil.parseAndKeepRawInput(phone), PhoneNumberFormat.INTERNATIONAL)
  } else {
    return phone
  }
}
