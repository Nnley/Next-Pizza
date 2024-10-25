import { PizzaSize, PizzaType } from '@/constants/pizza'
import { CartStateItem } from '@/lib/get-cart-details'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { CheckoutCartItem } from '../checkout-cart-item'
import { WhiteBlock } from '../white-block'

interface Props {
	items: CartStateItem[]
	removeCartItem: (id: number) => void
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
	className?: string
}

export const CheckoutCart = ({ items, removeCartItem, onClickCountButton, className }: Props) => {
	return (
		<WhiteBlock title='1. Корзина'>
			<div className='flex flex-col gap-5'>
				{items.map(item => (
					<CheckoutCartItem
						key={item.id}
						id={item.id}
						imageUrl={item.imageUrl}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						details={
							item.pizzaSize && item.pizzaType
								? getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)
								: ''
						}
						disabled={item.disabled}
						onClickRemove={() => removeCartItem(item.id)}
						onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
					/>
				))}
			</div>
		</WhiteBlock>
	)
}
