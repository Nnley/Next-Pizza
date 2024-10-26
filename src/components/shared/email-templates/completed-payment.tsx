import { CartItemDTO } from '@/services/dto/cart.dto'
import React from 'react'

interface Props {
	orderId: number
	items: CartItemDTO[]
	discountPercentage?: number
}

export const completedPaymentTemplate: React.FC<Props> = ({ orderId, items, discountPercentage }: Props) => {
	return (
		<div>
			<h1>Спасибо за заказ!</h1>

			<p>
				Ваш заказ #{orderId} оплачен. Список товаров {discountPercentage ? 'с учетом скидки' : ''}:
			</p>

			<ul>
				{items.map(item => (
					<li key={item.productVariation.id}>
						{item.productVariation.product.name} -{' '}
						{discountPercentage
							? (item.quantity * item.productVariation.price * (100 - discountPercentage)) / 100
							: item.quantity * item.productVariation.price}{' '}
						({item.quantity} шт.)
					</li>
				))}
			</ul>
		</div>
	)
}
