'use client'

import { registerUser } from '@/app/actions'
import { Button } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormInput } from '../../../form'
import { FormRegisterValue, formRegisterSchema } from './schemas'

interface Props {
	onClose?: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<FormRegisterValue>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			repeatPassword: '',
		},
	})

	const onSubmit = async (data: FormRegisterValue) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.error('Регистрация успешна. Подтвердите свою почту')

			onClose?.()
		} catch (error) {
			return toast.error('Неверный E-Mail или пароль')
		}
	}

	return (
		<FormProvider {...form}>
			<form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput name='email' label='E-Mail' required />
				<FormInput name='fullName' label='Полное имя' required />
				<FormInput name='password' label='Пароль' type='password' required />
				<FormInput name='confirmPassword' label='Подтвердите пароль' type='password' required />

				<Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	)
}
