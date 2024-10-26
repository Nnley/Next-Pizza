import { Resend } from 'resend'

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
	const resend = new Resend(process.env.RESEND_API)

	const { data, error } = await resend.emails.send({
		from: 'Nnley <onboarding@resend.dev>',
		to,
		subject,
		react: template,
	})
}
