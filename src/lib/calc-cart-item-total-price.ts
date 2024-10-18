import { CartItemDTO } from '../services/dto/cart.dto'

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return (item.productVariation.price + ingredientsPrice) * item.quantity
}
