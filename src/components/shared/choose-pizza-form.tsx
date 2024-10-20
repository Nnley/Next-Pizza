import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/constants/pizza'
import { calcTotalPizzaPrice } from '@/lib/calc-total-pizza-price'
import { cn } from '@/lib/utils'
import { Ingredient, ProductVariation } from '@prisma/client'
import React from 'react'
import { useSet } from 'react-use'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { IngredientItem } from './ingredient-item'
import { PizzaImage } from './pizza-image'
import { Title } from './title'

interface Props {
	imageUrl: string
	name: string
	loading?: boolean
	ingredients: Ingredient[]
	variations: ProductVariation[]
	onSubmit: (variationId: number, ingredients: number[]) => void
	className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	className,
	ingredients,
	variations,
	loading,
	onSubmit,
}) => {
	const [size, setSize] = React.useState<PizzaSize>(30)
	const [type, setType] = React.useState<PizzaType>(1)

	const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet(new Set<number>([]))

	const currentItemId = variations.find(variation => variation.size === size && variation.pizzaType === type)?.id

	const availableCrustVariations = variations.filter(item => item.size === size)

	React.useEffect(() => {
		if (availableCrustVariations.length <= 1) {
			setType(availableCrustVariations[0].pizzaType as PizzaType)
		}
	}, [size])

	const availablePizzaSizes = pizzaSizes.map(item => ({
		...item,
		disabled: !variations.some(variation => variation.size === Number(item.value)),
	}))
	const availablePizzaTypes = pizzaTypes.map(item => ({
		...item,
		disabled: !availableCrustVariations.some(availableType => availableType.pizzaType === Number(item.value)),
	}))

	const totalPrice = calcTotalPizzaPrice({ variations, ingredients, selectedIngredients, type, size })

	const handleClickAddCard = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients))
		}
	}

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} className='' size={size} />

			<div className='w-[490px] bg-[#fcfcfc] p-7'>
				<div className='flex flex-col overflow-auto scrollbar'>
					<Title text={name} size='md' className='font-extrabold mb-1' />

					<p className='text-gray-400'>
						{mapPizzaType[type]} тесто, {size} см
					</p>

					<div className='flex flex-col gap-3 mt-4'>
						<GroupVariants
							items={availablePizzaSizes}
							value={String(size)}
							onClick={value => setSize(Number(value) as PizzaSize)}
						/>
						<GroupVariants
							items={availablePizzaTypes}
							value={String(type)}
							onClick={value => setType(Number(value) as PizzaType)}
						/>
					</div>

					<div className='bg-gray-50 p-5 rounded-md h-[420px]'>
						<div className='pb-4'>
							<Title text='Добавить по вкусу' />
							<div className='mt-2 grid grid-cols-3 gap-3'>
								{ingredients.map(ingredient => (
									<IngredientItem
										key={ingredient.id}
										imageUrl={ingredient.imageUrl}
										name={ingredient.name}
										price={ingredient.price}
										onClick={() => toggleSelectedIngredients(ingredient.id)}
										active={selectedIngredients.has(ingredient.id)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				<Button
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
					onClick={handleClickAddCard}
					loading={loading}
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	)
}
