import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, 'Имя должно быть больше 2 символов'),
	lastName: z.string().min(2, 'Фамилия должна быть больше 2 символов'),
	email: z.string().email('Некорректный email'),
	phone: z.string().min(10, 'Введите корректный телефон'),
	address: z.string().min(5, 'Введите корректный адрес'),
	comment: z.string().optional(),
})
