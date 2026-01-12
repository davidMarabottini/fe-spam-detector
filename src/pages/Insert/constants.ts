import { ShieldBan, ShieldCheck } from "lucide-react";

export const spamOptions = [
  {label: 'SPAM', Icon: ShieldBan, value: 'spam'},
  {label: 'HAM', Icon: ShieldCheck, value: 'ham'},
]
  
export const initialValues = {
  language: "",
  isSpam: undefined,
  subject: "",
  from_name: "",
  from_mail: "",
  to: "",
  body_text: "",
} as const
