import { FormInput } from '@/components/shared/form'
import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formLoginSchema, FormLoginValue } from './schemas'

interface Props {
	onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<FormLoginValue>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: FormLoginValue) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			})

			if (!resp?.ok) {
				throw Error()
			}

			toast.success('Вы вошли в аккаунт')

			onClose?.()
		} catch (error) {
			console.log('[LOGIN ERROR]', error)
			toast.error('Не удалось войти в аккаунт')
		}
	}

	return (
		<FormProvider {...form}>
			<form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title text='Вход в аккаунт' size='md' className='font-bold' />
						<p className='text-gray-400'>Введите свою почту, чтобы войти в свой аккаунт</p>
					</div>
				</div>

				<FormInput name='email' label='E-mail' required />
				<FormInput name='password' label='Пароль' required type='password' />

				<Button loading={form.formState.isSubmitting} className='h-12 text-base'>
					Войти
				</Button>
			</form>
		</FormProvider>
	)
}
