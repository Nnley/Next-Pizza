import { z } from 'zod'

export const passwordSchema = z.string().min(4, { message: 'Пароль должен быть больше 4 символов' })

export const formLoginSchema = z.object({
	email: z.string().email('Некорректный email'),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, 'Имя и фамилия должны быть больше 2 символов'),
			repeatPassword: passwordSchema,
		})
	)
	.refine(data => data.password === data.repeatPassword, {
		message: 'Пароли не совпадают',
		path: ['repeatPassword'],
	})

export type FormLoginValue = z.infer<typeof formLoginSchema>
export type FormRegisterValue = z.infer<typeof formRegisterSchema>
