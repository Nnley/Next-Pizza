import { PizzaSize, PizzaType } from '@/constants/pizza'
import { CartStateItem } from '@/lib/get-cart-details'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { CheckoutCartItem } from '../checkout-cart-item'
import { CheckoutCartItemSkeleton } from '../checkout-cart-item-skeleton'
import { WhiteBlock } from '../white-block'

interface Props {
	items: CartStateItem[]
	removeCartItem: (id: number) => void
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
	loading?: boolean
	className?: string
}

export const CheckoutCart = ({ items, removeCartItem, onClickCountButton, loading, className }: Props) => {
	return (
		<WhiteBlock title='1. Корзина' className={className}>
			<div className='flex flex-col gap-5'>
				{loading && [...Array(4)].map((_, index) => <CheckoutCartItemSkeleton key={index} />)}

				{!loading &&
					items.length > 0 &&
					items.map(item => (
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
