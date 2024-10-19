'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { useCart } from '@/hooks/use-cart'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui'
import { CartDrawerItem } from './cart-drawer-item'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart()

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	const onClickDeleteButton = (id: number) => {
		removeCartItem(id)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#f3f3f7]'>
				<SheetHeader>
					<SheetTitle>
						В корзине <span className='font-bold'>{items.length} товара</span>
					</SheetTitle>
					<VisuallyHidden>
						<SheetDescription>Корзина товаров</SheetDescription>
					</VisuallyHidden>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto flex-1 flex flex-col gap-2'>
					{items.map(item => (
						<CartDrawerItem
							key={item.id}
							id={item.id}
							imageUrl={item.imageUrl}
							details={
								item.pizzaSize && item.pizzaType
									? getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)
									: ''
							}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							onClickDeleteButton={() => onClickDeleteButton(item.id)}
							onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
						/>
					))}
				</div>

				<SheetFooter className='-mx-6 bg-white p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>

							<span className='font-bold text-lg'>{totalAmount} ₽</span>
						</div>

						<Link href='/cart'>
							<Button type='submit' className='w-full h-12 text-base'>
								Оформить заказ
								<ArrowRight className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
