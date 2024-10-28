import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import * as CartItemDetails from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void
	onClickRemove?: () => void
	showCountButtons?: boolean
	showRemoveButton?: boolean
	leftContentClassName?: string
	showQuantity?: boolean
	className?: string
}

export const CheckoutCartItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickRemove,
	onClickCountButton,
	showCountButtons = true,
	showRemoveButton = true,
	showQuantity = false,
	className,
	leftContentClassName,
}) => {
	return (
		<div className={cn('flex items-center justify-between', { 'opacity-50 pointer-events-none': disabled }, className)}>
			<div className='flex items-center gap-5 flex-1'>
				<CartItemDetails.Image src={imageUrl} />
				<CartItemDetails.Info name={name} details={details} />
			</div>

			<CartItemDetails.Price value={price} />

			<div className={cn('flex items-center gap-5', leftContentClassName)}>
				{showCountButtons && <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />}
				{showRemoveButton && (
					<button type='button' onClick={onClickRemove}>
						<X className='text-gray-400 cursor-pointer hover:text-gray-600' size={20} />
					</button>
				)}
				{showQuantity && <span className='text-gray-400'>({quantity} шт.)</span>}
			</div>
		</div>
	)
}
