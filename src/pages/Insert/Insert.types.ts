import type { IMailFormData } from "@/types/mailFormDatas.types"
import type { MarkRequired } from "@/types/utilities.types"

export interface IFormMail extends IMailFormData {
  language: string
  isSpam: 'ham' | 'spam' | undefined
}

export type IFormFinalType = MarkRequired<IFormMail, 'isSpam' | 'is_html'>
