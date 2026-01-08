export type AvailableDomains = 'mail' | 'sms';
export type AvailableOutcomes = 'ham' | 'spam';


export interface IMailFormData {
  from_name: string;
  from_mail: string;
  to: string;
  subject: string;
  is_html: boolean;
  body_text: string;
};

export interface ISMSFormData {
  text: string;
}