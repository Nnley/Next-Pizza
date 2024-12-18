'use client'

import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Button } from '../ui'
import { CartDrawer } from './cart-drawer'

interface Props {
	className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const { items, totalAmount, loading } = useCartStore(state => state)

	return (
		<CartDrawer>
			<Button className={cn('group relative', loading && 'w-28', className)} loading={loading}>
				{items.length > 0 ? (
					<>
						<b>{totalAmount} ₽</b>
						<span className='h-full w-[1px] bg-white/30 mx-3' />
						<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
							<ShoppingCart size={16} className='relative' strokeWidth={2} />
							<b>{items.length}</b>
						</div>
						<ArrowRight
							size={20}
							className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
						/>
					</>
				) : (
					<span className='text-base px-2'>Корзина</span>
				)}
			</Button>
		</CartDrawer>
	)
}
