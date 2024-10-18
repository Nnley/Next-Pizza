import { Ingredient, ProductVariation } from '@prisma/client'

interface Props {
	variations: ProductVariation[]
	ingredients: Ingredient[]
	selectedIngredients: Set<number>
	type: number
	size: number
}

export const calcTotalPizzaPrice = ({ variations, ingredients, selectedIngredients, type, size }: Props) => {
	const pizzaPrice = variations.find(item => item.pizzaType === type && item.size === size)?.price || 0
	const totalIngredientPrice = ingredients
		.filter(ingredients => selectedIngredients.has(ingredients.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return pizzaPrice + totalIngredientPrice
}
