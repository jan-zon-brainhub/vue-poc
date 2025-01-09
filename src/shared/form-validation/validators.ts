import emailValidator from 'email-validator'

export const required =
  (errorMessage = 'This field is required') =>
  (value: string) =>
    !!value || errorMessage

export const email =
  (errorMessage = 'Invalid email') =>
  (value: string) => {
    if (!value) {
      return true
    }
    return emailValidator.validate(value) || errorMessage
  }

export const minLength = (minLength: number, errorMessage?: string) => (value: string) =>
  value.length >= minLength || errorMessage || `Field is too short, minimum length is ${minLength}`
