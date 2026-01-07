export type TFormMail = {
  language: string
  isSpam: 'ham' | 'spam' | undefined
  subject: string
  from_name: string
  from_mail: string
  to: string
  body_text: string
  is_html: boolean | null
}

export type TFormFinalType = TFormMail & {isSpam: 'ham' | 'spam', is_html: boolean}