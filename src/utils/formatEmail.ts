type MailFormData = {
  from_name: string
  from_mail: string
  to: string
  subject: string
  is_html: boolean
  body_text: string
}
export function buildSMTPString(formData: MailFormData): string {
  const boundary = `--${Math.random().toString(36).slice(2)}`;

  const headers = [
    `From: "${formData.from_name}" <${formData.from_mail}>`,
    `To: ${formData.to}`,
    `Subject: ${formData.subject}`,
    `Date: ${new Date().toUTCString()}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative;\n\tboundary="${boundary}"`,
  ];

  const body = formData.is_html
    ? `\n${boundary}\nContent-Type: text/html;\n\n${formData.body_text}\n${boundary}--\n`
    : `\n${boundary}\nContent-Type: text/plain;\n\n${formData.body_text}\n${boundary}--\n`;

  return `${headers.join('\n')}\n${body}`;
}