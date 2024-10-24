import { cn } from '@/lib/utils'
import React from 'react'

import { X } from 'lucide-react'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'

interface Props extends CartItemProps {
	onClickDeleteButton?: () => void
	onClickCountButton?: (type: 'plus' | 'minus') => void
	className?: string
}

export const CartDrawerItem: React.FC<Props> = ({
	imageUrl,
	name,
	details,
	disabled,
	quantity,
	price,
	onClickDeleteButton,
	onClickCountButton,
	className,
}) => {
	return (
		<div className={cn('flex bg-white p-5 gap-6', { 'opacity-50 pointer-events-none': disabled }, className)}>
			<CartItem.Image src={imageUrl} />

			<div className='flex-1'>
				<div className='flex justify-between relative'>
					<CartItem.Info name={name} details={details} />
					<X
						className='text-gray-500 cursor-pointer hover:text-gray-600 absolute right-0'
						size={18}
						onClick={onClickDeleteButton}
					/>
				</div>

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CountButton onClick={onClickCountButton} value={quantity} size='sm' />

					<div className='flex items-center'>
						<CartItem.Price value={price} />
					</div>
				</div>
			</div>
		</div>
	)
}
