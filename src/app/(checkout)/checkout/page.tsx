'use client'

import { CheckoutPaymentDetails, Container, Title, WhiteBlock } from '@/components/shared'
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from '@/components/shared/checkout'
import { checkoutFormSchema, CheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema'
import { Button } from '@/components/ui'
import { useCart } from '@/hooks/use-cart'
import { zodResolver } from '@hookform/resolvers/zod'
import type { PromotionCode } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function CheckoutPage() {
	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart()
	const [promoCodeData, setPromoCodeData] = React.useState<PromotionCode | null>(null)

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

	const onSubmit = (data: CheckoutFormValues) => {
		console.log(data)
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
							<CheckoutCart items={items} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton} />

							<CheckoutPersonalForm />

							<CheckoutAddressForm />
						</div>

						<div className='w-[450px]'>
							<WhiteBlock className='p-6 sticky top-4'>
								<CheckoutPaymentDetails
									promoCodeData={promoCodeData}
									setPromoCodeData={setPromoCodeData}
									totalAmount={totalAmount}
								/>
								<Button type='submit' className='mt-6 w-full h-14 rounded-2xl text-base font-bold'>
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
