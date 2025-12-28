export type RegistrationData = {
  name?: string
  surname?: string
  // birthday?: string
  gender?: 'M' | 'F' | ''
  username?: string
  password?: string
};

export type RegistrationForm = {
  name: string
  surname: string
  gender: 'M' | 'F' | ''
  email: string
  username: string
  password: string
  repeatPassword: string
}