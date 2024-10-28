'use client'

import { PizzaSize, PizzaType } from '@/constants/pizza'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { cn } from '@/lib/utils'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { Order, User } from '@prisma/client'
import React from 'react'
import { CheckoutCartItem } from './checkout-cart-item'
import { OrderBlock } from './order-block'
import { Title } from './title'

interface Props {
	data: User & { orders: Order[] }
	className?: string
}

export const ProfileOrders: React.FC<Props> = ({ data, className }) => {
	return (
		<div className={cn('my-10', className)}>
			<Title text='Мои заказы' size='md' className='font-bold' />
			<div className='flex flex-col mt-6 gap-3 max-h-[600px] overflow-y-auto scrollbar'>
				{data.orders
					.sort((a: Order, b: Order) => a.id - b.id)
					.map(order => (
						<OrderBlock
							key={order.id}
							title={'Заказ #' + order.id}
							status={order.status}
							contentClassName='flex flex-col'
						>
							{JSON.parse(order.items as string).map((item: CartItemDTO) => (
								<CheckoutCartItem
									key={item.id}
									id={item.id}
									imageUrl={item.productVariation.product.imageUrl}
									name={item.productVariation.product.name}
									price={item.productVariation.price * item.quantity}
									quantity={item.quantity}
									details={
										item.productVariation.pizzaType
											? getCartItemDetails(
													item.productVariation.pizzaType as PizzaType,
													item.productVariation.size as PizzaSize,
													item.ingredients
											  )
											: ''
									}
									showCountButtons={false}
									showRemoveButton={false}
									showQuantity={true}
									className='border-b border-gray-100 py-3'
									leftContentClassName='ml-5'
								/>
							))}
							<div className='text-xl pt-6 pb-2 px-2'>
								Итого: <span className='font-bold'>{order.totalAmount} ₽</span>
							</div>
						</OrderBlock>
					))}
			</div>
		</div>
	)
}
