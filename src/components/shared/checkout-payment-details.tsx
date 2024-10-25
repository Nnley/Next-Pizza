'use client'

import { checkPromoCode } from '@/app/actions'
import { cn } from '@/lib/utils'
import type { PromotionCode } from '@prisma/client'
import { ArrowRight, BadgePercent, Package, Percent, Truck } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Button, Input } from '../ui'
import { CheckoutPaymentItemDetails } from './checkout-payment-item-details'

interface Props {
	className?: string
}

export const CheckoutPaymentDetails: React.FC<Props> = ({ className }) => {
	const [showPromoCodeField, setShowPromoCodeField] = React.useState<boolean>(false)
	const [promoCodeInput, setPromoCodeInput] = React.useState<string>('')
	const [isPromoCodeLoading, setIsPromoCodeLoading] = React.useState<boolean>(false)
	const [promoCodeData, setPromoCodeData] = React.useState<PromotionCode | null>(null)

	const onApplyPromoCode = async () => {
		if (promoCodeData !== null && promoCodeData.code === promoCodeInput) {
			return toast.error('Промокод уже применен')
		}

		setIsPromoCodeLoading(true)
		const code = await checkPromoCode(promoCodeInput)

		if (code) {
			setPromoCodeData(code)
			toast.success('Промокод успешно применен!')
		} else {
			toast.error('Промокод не действителен')
			setPromoCodeData(null)
		}

		setIsPromoCodeLoading(false)
	}

	return (
		<div className={className}>
			<div className='flex flex-col gap-1 mb-8'>
				<span className='text-xl'>Итого:</span>
				<span className='text-[34px] font-extrabold'>4301 ₽</span>
			</div>

			<CheckoutPaymentItemDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-300' />
						Стоимость товаров:
					</div>
				}
				value={`3901 ₽`}
			/>
			<CheckoutPaymentItemDetails
				title={
					<div className='flex items-center'>
						<Percent size={18} className='mr-2 text-gray-300' />
						Налоги:
					</div>
				}
				value={`200 ₽`}
			/>
			<CheckoutPaymentItemDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-300' />
						Доставка:
					</div>
				}
				value={`100 ₽`}
			/>
			{promoCodeData !== null && (
				<CheckoutPaymentItemDetails
					title={
						<div className='flex items-center'>
							<BadgePercent size={18} className='mr-2 text-gray-300' />
							Скидка:
						</div>
					}
					value={`${3901 * (1 - promoCodeData.discountPercentage / 100)} ₽`}
				/>
			)}

			<div className='mt-10 mb-6 border-t border-t-gray-200' />

			<p
				className={cn('text-gray-400 text-base cursor-pointer', { hidden: showPromoCodeField })}
				onClick={() => setShowPromoCodeField(!showPromoCodeField)}
			>
				У меня есть промокод
			</p>

			<div className={cn('flex gap-3', { hidden: !showPromoCodeField })}>
				<Input
					name='promoCode'
					className='border-gray-100 py-6 px-4 text-base'
					placeholder='Промокод'
					onChange={e => setPromoCodeInput(e.target.value)}
					value={promoCodeInput}
				/>
				<Button
					className='text-base cursor-pointer py-6 min-w-[120px]'
					onClick={onApplyPromoCode}
					loading={isPromoCodeLoading}
				>
					Применить
				</Button>
			</div>

			<Button type='submit' className='mt-6 w-full h-14 rounded-2xl text-base font-bold'>
				Перейти к оплате
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</div>
	)
}
