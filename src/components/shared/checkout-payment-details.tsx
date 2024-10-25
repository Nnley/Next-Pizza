'use client'

import { checkPromoCode } from '@/app/actions'
import { cn } from '@/lib/utils'
import type { PromotionCode } from '@prisma/client'
import { BadgePercent, Package, Percent, Truck } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Button, Input } from '../ui'
import { CheckoutPaymentItemDetails } from './checkout-payment-item-details'

interface Props {
	promoCodeData: PromotionCode | null
	setPromoCodeData: React.Dispatch<React.SetStateAction<PromotionCode | null>>
	totalAmount: number
	className?: string
}

export const CheckoutPaymentDetails: React.FC<Props> = ({
	promoCodeData,
	setPromoCodeData,
	totalAmount,
	className,
}) => {
	const [showPromoCodeField, setShowPromoCodeField] = React.useState<boolean>(false)
	const [promoCodeInput, setPromoCodeInput] = React.useState<string>('')
	const [isPromoCodeLoading, setIsPromoCodeLoading] = React.useState<boolean>(false)

	const calcTotalDiscountAmount = () => {
		if (!promoCodeData) return 0
		return totalAmount * (1 - promoCodeData.discountPercentage / 100)
	}

	const onApplyPromoCode = async () => {
		if (promoCodeData !== null && promoCodeData.code === promoCodeInput) {
			return toast.error('Этот промокод уже применен')
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
				<span className='text-[34px] font-extrabold'>
					{promoCodeData ? totalAmount - calcTotalDiscountAmount() : totalAmount} ₽
				</span>
			</div>

			<CheckoutPaymentItemDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-300' />
						Стоимость товаров:
					</div>
				}
				value={`${totalAmount} ₽`}
			/>
			<CheckoutPaymentItemDetails
				title={
					<div className='flex items-center'>
						<Percent size={18} className='mr-2 text-gray-300' />
						Налоги:
					</div>
				}
				value={`${(totalAmount * 0.13).toFixed(2)} ₽`}
			/>
			<CheckoutPaymentItemDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-300' />
						Доставка:
					</div>
				}
				value={`200 ₽`}
			/>
			{promoCodeData !== null && (
				<CheckoutPaymentItemDetails
					title={
						<div className='flex items-center'>
							<BadgePercent size={18} className='mr-2 text-gray-300' />
							Скидка:
						</div>
					}
					value={`${calcTotalDiscountAmount()} ₽`}
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
		</div>
	)
}
