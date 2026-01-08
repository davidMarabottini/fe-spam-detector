import type { AvailableOutcomes, IMailFormData, ISMSFormData } from "@/types/contentsFormDatas.types"
import type { MarkRequired } from "@/types/utilities.types"

export interface IExternalForm {
  language: string
  isSpam: AvailableOutcomes | undefined
}

export interface IFormMail extends IMailFormData, IExternalForm {}
export type IFormMailFinalType = MarkRequired<IFormMail, 'isSpam' | 'is_html'>

export interface IFormSMS extends ISMSFormData, IExternalForm {}
export type IFormSMSFinalType = MarkRequired<IFormSMS, 'isSpam'>
