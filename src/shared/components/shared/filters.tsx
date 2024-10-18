'use client'

import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'
import {} from '@/shared/hooks/use-ingredients'
import React from 'react'
import { Input } from '../ui'
import { CheckBoxFiltersGroup } from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { Title } from './title'

interface Props {
	className?: string
}

export const Filters: React.FC<React.PropsWithChildren<Props>> = ({ className }) => {
	const { ingredients, loading } = useIngredients()

	const filters = useFilters()
	useQueryFilters(filters)

	const items = ingredients.map(item => ({ text: item.name, value: String(item.id) }))

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<CheckBoxFiltersGroup
				title='Тип теста'
				name='pizzaTypes'
				className='mt-5'
				onClickCheckbox={filters.setPizzaTypes}
				selectedValues={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<CheckBoxFiltersGroup
				title='Размеры'
				name='sizes'
				className='mt-5'
				onClickCheckbox={filters.setSizes}
				selectedValues={filters.sizes}
				items={[
					{ text: 'Маленькая', value: '1' },
					{ text: 'Средняя', value: '2' },
					{ text: 'Большая', value: '3' },
				]}
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.priceFrom)}
						onChange={e => filters.setPrices(Number(e.target.value), filters.priceTo)}
					/>
					<Input
						type='number'
						placeholder='1000'
						min={100}
						max={1000}
						value={String(filters.priceTo)}
						onChange={e => filters.setPrices(filters.priceFrom, Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.priceFrom, filters.priceTo]}
					onValueChange={([priceFrom, priceTo]) => filters.setPrices(priceFrom, priceTo)}
				/>
			</div>

			<CheckBoxFiltersGroup
				title='Ингредиенты'
				className='mt-5'
				limit={6}
				defaultItems={items}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selectedValues={filters.ingredients}
			/>
		</div>
	)
}
