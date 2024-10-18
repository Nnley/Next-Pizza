import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useSet } from 'react-use'

interface PriceRange {
	priceFrom: number
	priceTo: number
}

export interface Filters {
	sizes: Set<string>
	pizzaTypes: Set<string>
	ingredients: Set<string>
	priceFrom: number
	priceTo: number
}

interface ReturnProps extends Filters {
	setPrices: (min: number, max: number) => void
	setPizzaTypes: (value: string) => void
	setSizes: (value: string) => void
	setIngredients: (value: string) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams()

	const [ingredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : [])
	)

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : [])
	)

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])
	)

	const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceRange>({
		priceFrom: Number(searchParams.get('priceFrom')) || 0,
		priceTo: Number(searchParams.get('priceTo')) || 1000,
	})

	const onChangePrice = (min: number, max: number) => {
		setPrice({ priceFrom: min, priceTo: max })
	}

	return {
		sizes,
		pizzaTypes,
		ingredients,
		priceFrom,
		priceTo,
		setPrices: onChangePrice,
		setPizzaTypes: togglePizzaTypes,
		setSizes: toggleSizes,
		setIngredients: toggleIngredients,
	}
}
