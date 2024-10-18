'use client'

import { cn } from '@/lib/utils'
import React from 'react'

import { X } from 'lucide-react'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'

interface Props extends CartItemProps {
	className?: string
}

export const CartDrawerItem: React.FC<Props> = ({ imageUrl, name, details, quantity, price, disabled, className }) => {
	return (
		<div className={cn('flex bg-white p-5 gap-6', className)}>
			<CartItem.Image src={imageUrl} />

			<div className='flex-1'>
				<div className='flex justify-between'>
					<CartItem.Info name={name} details={details} />
					<X className='text-gray-500 cursor-pointer hover:text-gray-600 absolute right-5' size={18} />
				</div>

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CountButton onClick={type => console.log(type)} value={quantity} size='sm' />

					<div className='flex items-center'>
						<CartItem.Price value={price} />
					</div>
				</div>
			</div>
		</div>
	)
}
