'use client'

import { createOrder } from '@/app/actions'
import { CheckoutPaymentDetails, Container, Title, WhiteBlock } from '@/components/shared'
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from '@/components/shared/checkout'
import { checkoutFormSchema, CheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema'
import { Button } from '@/components/ui'
import { useCart } from '@/hooks/use-cart'
import { Api } from '@/services/api-client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { PromotionCode } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart()
	const [promoCodeData, setPromoCodeData] = React.useState<PromotionCode | null>(null)
	const { data: session } = useSession()

	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [submitting, setSubmitting] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (!loading) {
			setIsLoading(false)
		}
	}, [loading])

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe()
			const [firstName, lastName] = data.fullName.split(' ')

			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
			form.setValue('email', data.email)
		}

		if (session) {
			fetchUserInfo()
		}
	}, [session])

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true)
			const url = await createOrder(data, promoCodeData?.code)

			toast.success('Заказ успешно оформлен! Переход на оплату...')

			if (url) {
				location.href = url
			}
		} catch (e) {
			setSubmitting(false)
			console.log(e)
			toast.error('Не удалось оформить заказ')
		}
	}

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Container className='mt-8'>
			<Title text='Оформление заказа' size='lg' className='font-extrabold mb-8' />

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								items={items}
								removeCartItem={removeCartItem}
								onClickCountButton={onClickCountButton}
								loading={isLoading}
							/>

							<CheckoutPersonalForm className={isLoading ? 'opacity-50 cursor-not-allowed' : ''} />

							<CheckoutAddressForm className={isLoading ? 'opacity-50 cursor-not-allowed' : ''} />
						</div>

						<div className='w-[450px]'>
							<WhiteBlock className='p-6 sticky top-4'>
								<CheckoutPaymentDetails
									promoCodeData={promoCodeData}
									setPromoCodeData={setPromoCodeData}
									totalAmount={totalAmount}
									loading={isLoading}
								/>
								<Button
									loading={isLoading || submitting}
									type='submit'
									className='mt-6 w-full h-14 rounded-2xl text-base font-bold'
								>
									Перейти к оплате
									<ArrowRight className='w-5 ml-2' />
								</Button>
							</WhiteBlock>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
