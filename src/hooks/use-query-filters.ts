import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { Filters } from './use-filters'

export const useQueryFilters = (filters: Filters) => {
	const isMounted = React.useRef(false)
	const router = useRouter()

	const { pizzaTypes, sizes, ingredients, priceFrom, priceTo } = filters

	React.useEffect(() => {
		if (isMounted.current) {
			const params: any = {
				pizzaTypes: Array.from(pizzaTypes),
				sizes: Array.from(sizes),
				ingredients: Array.from(ingredients),
			}

			if (priceFrom !== 0 || priceTo !== 1000) {
				params.priceFrom = priceFrom
				params.priceTo = priceTo
			}

			const query = qs.stringify(params, { arrayFormat: 'comma' })

			router.push(`?${query}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [pizzaTypes, sizes, ingredients, priceFrom, priceTo, router])
}
