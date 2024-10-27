'use client'

import { updateUserInfo } from '@/app/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../ui'
import { Container } from './container'
import { FormInput } from './form'
import { formRegisterSchema, FormRegisterValue } from './modals/auth-modal/forms/schemas'
import { Title } from './title'

interface Props {
	data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			repeatPassword: '',
		},
	})

	const onSubmit = async (data: FormRegisterValue) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})

			toast.error('Данные обновлены 📝', {
				icon: '✅',
			})
		} catch (error) {
			return toast.error('Ошибка при обновлении данных', {
				icon: '❌',
			})
		}
	}

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/',
		})
	}

	return (
		<Container className='my-10'>
			<Title text='Личные данные' size='md' className='font-bold' />

			<FormProvider {...form}>
				<form className='flex flex-col gap-5 w-96 mt-10' onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name='email' label='E-Mail' required />
					<FormInput name='fullName' label='Полное имя' required />

					<FormInput type='password' name='password' label='Новый пароль' required />
					<FormInput type='password' name='confirmPassword' label='Повторите пароль' required />

					<div className='flex flex-col gap-3 mt-6'>
						<Button disabled={form.formState.isSubmitting} className='text-base py-6' type='submit'>
							Сохранить
						</Button>

						<Button
							onClick={onClickSignOut}
							variant='outline'
							disabled={form.formState.isSubmitting}
							className='text-base py-6'
							type='button'
						>
							Выйти
						</Button>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
